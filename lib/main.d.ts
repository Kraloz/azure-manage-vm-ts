declare function startVm(): Promise<import("@azure/ms-rest-js").RestResponse | undefined>;
declare function stopVm(): Promise<import("@azure/ms-rest-js").RestResponse | undefined>;
export { startVm, stopVm };
