# azure-manage-vm-ts
🚨🚧 WIP 🚧🚨

Módulo para prender/apagar y tirar comandos en una instancia de azure vm con login a través de un Azure Active Directory Service Principal

Typescript based

## Por qué?
Quiero poder consumir este módulo desde mi bot de discord para prender y apagar un servidor de minecraft
hosteado en una VM en azure xd

### TODO 📝:

- [X] Conectar con azure
- [X] Prender VM
- [X] Apagar VM
- [ ] Ejecutar comandos de consola (necesito ssh maybe?)
- [ ] Ofrecer API para consumir desde otro módulo

### Librerías SDK de azure:
[@azure/ms-rest-nodeauth](https://github.com/Azure/ms-rest-nodeauth)
[@azure/arm-compute](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/compute/arm-compute)

### Links a documentación de azure:
[API Virtual Machines](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachines)
[Crear una aplicación en Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)


**Setear las siguientes variables de entorno:**
```
AZURE_SUBSCRIPTION_ID
APPLICATION_CLIENT_ID
APPLICATION_SECRET
DOMAIN (directory_tenant_id)
VM_NAME
RESOURCE_GROUP_NAME
```
