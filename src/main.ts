import * as dotenv from "dotenv";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { ComputeManagementClient } from "@azure/arm-compute";

dotenv.config();

const subscriptionId = <string>process.env['AZURE_SUBSCRIPTION_ID'];
const clientId = <string>process.env["APPLICATION_CLIENT_ID"];
const secret = <string>process.env["APPLICATION_SECRET"];
const tenantId = <string>process.env["DOMAIN"];
const vmName = <string>process.env["VM_NAME"];
const resourceGroupName = <string>process.env["RESOURCE_GROUP_NAME"];

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
    const restResponse = await computeClient.virtualMachines.start(resourceGroupName, vmName);
    console.log('response in start is: ', restResponse);
    return restResponse
  } catch (error) {
    console.error(' error in start is :', error);
  }
}

async function getAzureAuth(clientId: string, secret: string, tenantId: string): Promise<any> {
  try {
    const authres = await msRestNodeAuth.loginWithServicePrincipalSecretWithAuthResponse(clientId, secret, tenantId);
    // console.dir(authres, { depth: null });
    return authres;
  } catch (err) {
    console.log("login auth error:", err);
  }
}

// startVm();
// stopVm();