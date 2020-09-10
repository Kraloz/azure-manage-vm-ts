"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopVm = exports.startVm = void 0;
const dotenv = __importStar(require("dotenv"));
const msRestNodeAuth = __importStar(require("@azure/ms-rest-nodeauth"));
const arm_compute_1 = require("@azure/arm-compute");
dotenv.config();
const subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
const clientId = process.env["APPLICATION_CLIENT_ID"];
const secret = process.env["APPLICATION_SECRET"];
const tenantId = process.env["DOMAIN"];
const vmName = process.env["VM_NAME"];
const resourceGroupName = process.env["RESOURCE_GROUP_NAME"];
async function startVm() {
    try {
        const { credentials } = await getAzureAuth(clientId, secret, tenantId);
        const computeClient = new arm_compute_1.ComputeManagementClient(credentials, subscriptionId);
        console.log('waiting azure response for [START VM]...');
        const restResponse = await computeClient.virtualMachines.start(resourceGroupName, vmName);
        console.log('response in start is: ', restResponse);
        return restResponse;
    }
    catch (error) {
        console.error(' error in start is :', error);
    }
}
exports.startVm = startVm;
async function stopVm() {
    try {
        const { credentials } = await getAzureAuth(clientId, secret, tenantId);
        const computeClient = new arm_compute_1.ComputeManagementClient(credentials, subscriptionId);
        console.log('waiting azure response for [STOP VM]...');
        await computeClient.virtualMachines.powerOff(resourceGroupName, vmName);
        const restResponse = await computeClient.virtualMachines.deallocate(resourceGroupName, vmName);
        console.log('response in stop is: ', restResponse);
        return restResponse;
    }
    catch (error) {
        console.error(' error in stop is :', error);
    }
}
exports.stopVm = stopVm;
async function getAzureAuth(clientId, secret, tenantId) {
    try {
        const authres = await msRestNodeAuth.loginWithServicePrincipalSecretWithAuthResponse(clientId, secret, tenantId);
        return authres;
    }
    catch (err) {
        console.log("login auth error:", err);
    }
}
//# sourceMappingURL=main.js.map