exports.default = async function(configuration) {
    // do not include passwords or other sensitive data in the file
    // rather create environment variables with sensitive data
    const CERTIFICATE_NAME = 'C:/Users/Administrador/Documents/CLIENTES ELECTRONICOS/TT-JUAN FERNANDO OCAMPO GIRALDO/Certificado_FE_ZcLDNTmzrgIdIPGN.p12';
    const TOKEN_PASSWORD = 'ZcLDNTmzrgIdIPGN';
  
    require("child_process").execSync(
      // your commande here ! For exemple and with JSign :
      `java -jar jsign-2.1.jar --keystore hardwareToken.cfg --storepass "${TOKEN_PASSWORD}" --storetype PKCS11 --tsaurl http://timestamp.digicert.com --alias "${CERTIFICATE_NAME}" "${configuration.path}"`,
      {
        stdio: "inherit"
      }
    );
  };
  

// "certificateFile": "C:/Users/Administrador/Documents/CLIENTES ELECTRONICOS/TT-JUAN FERNANDO OCAMPO GIRALDO/Certificado_FE_ZcLDNTmzrgIdIPGN.p12",
// "certificatePassword":"ZcLDNTmzrgIdIPGN",
// "signingHashAlgorithms": ["sha256"] ,
// "timeStampServer":"http://timestamp.digicert.com",