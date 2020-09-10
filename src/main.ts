import * as dotenv from "dotenv";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ComputeManagementClient } from "@azure/arm-compute";

dotenv.config();

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID as string;
const clientId = process.env.APPLICATION_CLIENT_ID as string;
const secret = process.env.APPLICATION_SECRET as string;
const tenantId = process.env.DOMAIN as string;
const vmName = process.env.VM_NAME as string;
const resourceGroupName = process.env.RESOURCE_GROUP_NAME as string;

async function startVm() {
  try {
    const { credentials } = await getAzureAuth(clientId, secret, tenantId);
    const computeClient = new ComputeManagementClient(credentials, subscriptionId);
    console.log('waiting azure response for [START VM]...');
    const restResponse = await computeClient.virtualMachines.start(resourceGroupName, vmName);
    console.log('response in start is: ', restResponse);
    return restResponse;
  } catch (error) {
    console.error(' error in start is :', error);
  }
}

async function stopVm() {
  try {
    const { credentials } = await getAzureAuth(clientId, secret, tenantId);
    const computeClient = new ComputeManagementClient(credentials, subscriptionId);
    console.log('waiting azure response for [STOP VM]...');
    await computeClient.virtualMachines.powerOff(resourceGroupName, vmName);
    const restResponse = await computeClient.virtualMachines.deallocate(resourceGroupName, vmName);
    console.log('response in stop is: ', restResponse);
    return restResponse
  } catch (error) {
    console.error(' error in stop is :', error);
  }
}

async function getAzureAuth(azureClientId: string, azureAppSecret: string, azureTenantId: string): Promise<any> {
  try {
    const authres = await msRestNodeAuth.loginWithServicePrincipalSecretWithAuthResponse(azureClientId, azureAppSecret, azureTenantId);
    return authres;
  } catch (err) {
    console.log("login auth error:", err);
  }
}


export {
  startVm,
  stopVm
}
