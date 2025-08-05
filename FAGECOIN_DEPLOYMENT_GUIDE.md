# 🪙 FageCoin - Guía de Despliegue Completa

## 📋 Descripción General

FageCoin es un token ERC-20 avanzado diseñado específicamente para el ecosistema FAGESAS. Incluye funcionalidades premium como staking, recompensas, y gestión de usuarios premium.

### 🌟 Características Principales

- **Token ERC-20 Estándar**: Compatible con todas las wallets y exchanges
- **Funcionalidad de Burning**: Los tokens pueden ser quemados permanentemente
- **Sistema de Staking**: Los usuarios pueden hacer stake de tokens para ganar recompensas
- **Usuarios Premium**: Sistema integrado de membresías premium
- **Pausable**: El contrato puede ser pausado en caso de emergencia
- **Suministro Máximo**: 1 billón de tokens máximo
- **Suministro Inicial**: 100 millones de tokens

## 🛠️ Requisitos Previos

### Software Necesario
```bash
# Node.js (versión 16 o superior)
https://nodejs.org/

# NPM o Yarn
npm install -g yarn

# Hardhat (framework de desarrollo)
npm install -g hardhat

# MetaMask (wallet browser)
https://metamask.io/
```

### Dependencias del Proyecto
```bash
npm install @openzeppelin/contracts
npm install @nomiclabs/hardhat-ethers
npm install @nomiclabs/hardhat-waffle
npm install hardhat
npm install ethers
```

## 🚀 Configuración del Proyecto

### 1. Estructura de Archivos
```
fagecoin-project/
├── contracts/
│   └── FageCoin.sol
├── scripts/
│   ├── deploy.js
│   └── verify.js
├── test/
│   └── FageCoin.test.js
├── hardhat.config.js
├── package.json
└── .env
```

### 2. Configuración de Hardhat

Crear `hardhat.config.js`:
```javascript
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Testnet (Sepolia)
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 20000000000,
    },
    // Mainnet
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 20000000000,
    },
    // Polygon
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 20000000000,
    },
    // BSC
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 20000000000,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
```

### 3. Variables de Entorno

Crear archivo `.env`:
```env
# Clave privada de tu wallet (SIN el prefijo 0x)
PRIVATE_KEY=tu_clave_privada_aqui

# API Key de Infura (regístrate en https://infura.io/)
INFURA_API_KEY=tu_infura_api_key_aqui

# API Key de Etherscan (para verificación)
ETHERSCAN_API_KEY=tu_etherscan_api_key_aqui

# Dirección del contrato después del despliegue
CONTRACT_ADDRESS=se_llenara_automaticamente
```

## 📄 Scripts de Despliegue

### Script de Despliegue (`scripts/deploy.js`)
```javascript
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Desplegando FageCoin...");
  
  // Obtener el contrato
  const FageCoin = await ethers.getContractFactory("FageCoin");
  
  // Desplegar el contrato
  const fageCoin = await FageCoin.deploy();
  await fageCoin.deployed();
  
  console.log("✅ FageCoin desplegado en:", fageCoin.address);
  console.log("📋 Hash de transacción:", fageCoin.deployTransaction.hash);
  
  // Información del token
  console.log("\n📊 Información del Token:");
  console.log("Nombre:", await fageCoin.name());
  console.log("Símbolo:", await fageCoin.symbol());
  console.log("Decimales:", await fageCoin.decimals());
  console.log("Suministro Total:", ethers.utils.formatEther(await fageCoin.totalSupply()), "FAGE");
  
  // Guardar la dirección en un archivo
  const fs = require('fs');
  const deploymentData = {
    contractAddress: fageCoin.address,
    transactionHash: fageCoin.deployTransaction.hash,
    blockNumber: fageCoin.deployTransaction.blockNumber,
    deployer: fageCoin.deployTransaction.from,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('./deployment.json', JSON.stringify(deploymentData, null, 2));
  console.log("💾 Información de despliegue guardada en deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
```

### Script de Verificación (`scripts/verify.js`)
```javascript
const { run } = require("hardhat");

async function main() {
  const contractAddress = "TU_DIRECCION_DEL_CONTRATO_AQUI";
  
  console.log("🔍 Verificando contrato en Etherscan...");
  
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // FageCoin no tiene argumentos de constructor
    });
    console.log("✅ Contrato verificado exitosamente");
  } catch (error) {
    console.error("❌ Error en verificación:", error);
  }
}

main();
```

## 🔧 Comandos de Despliegue

### 1. Preparar el Proyecto
```bash
# Instalar dependencias
npm install

# Compilar contratos
npx hardhat compile
```

### 2. Desplegar en Testnet (Sepolia)
```bash
# Desplegar en Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verificar en Etherscan
npx hardhat run scripts/verify.js --network sepolia
```

### 3. Desplegar en Mainnet
```bash
# ⚠️ ASEGÚRATE DE TENER ETH SUFICIENTE PARA GAS
npx hardhat run scripts/deploy.js --network mainnet

# Verificar en Etherscan
npx hardhat run scripts/verify.js --network mainnet
```

### 4. Desplegar en Otras Redes
```bash
# Polygon
npx hardhat run scripts/deploy.js --network polygon

# Binance Smart Chain
npx hardhat run scripts/deploy.js --network bsc
```

## ⚙️ Configuración Post-Despliegue

### 1. Actualizar la Aplicación React

Editar `src/hooks/useWeb3.ts`:
```typescript
// Reemplaza esta línea con tu dirección de contrato desplegado
const FAGECOIN_CONTRACT_ADDRESS = "TU_DIRECCION_DEL_CONTRATO_AQUI";
```

### 2. Configurar MetaMask

1. **Añadir Token Personalizado**:
   - Abrir MetaMask
   - Ir a "Activos" → "Importar tokens"
   - Pegar la dirección del contrato
   - El símbolo (FAGE) y decimales (18) se llenarán automáticamente

2. **Añadir Redes (si es necesario)**:
   ```javascript
   // Polygon
   Red: Polygon Mainnet
   RPC: https://polygon-rpc.com/
   Chain ID: 137
   Símbolo: MATIC
   
   // BSC
   Red: Binance Smart Chain
   RPC: https://bsc-dataseed.binance.org/
   Chain ID: 56
   Símbolo: BNB
   ```

## 🧪 Testing del Contrato

### Script de Prueba (`test/FageCoin.test.js`)
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FageCoin", function () {
  let fageCoin;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const FageCoin = await ethers.getContractFactory("FageCoin");
    fageCoin = await FageCoin.deploy();
    await fageCoin.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await fageCoin.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await fageCoin.balanceOf(owner.address);
      expect(await fageCoin.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await fageCoin.transfer(addr1.address, 50);
      expect(await fageCoin.balanceOf(addr1.address)).to.equal(50);
    });

    it("Should allow staking", async function () {
      await fageCoin.transfer(addr1.address, 1000);
      await fageCoin.connect(addr1).stake(500);
      
      const stakingInfo = await fageCoin.getStakingInfo(addr1.address);
      expect(stakingInfo.stakedAmount).to.equal(500);
    });
  });
});
```

### Ejecutar Pruebas
```bash
npx hardhat test
```

## 💰 Costos Estimados de Despliegue

### Gas Estimado por Red
| Red | Costo Estimado | Tiempo |
|-----|---------------|---------|
| Ethereum Mainnet | $50-200 USD | 2-15 min |
| Polygon | $0.01-0.10 USD | 30 seg |
| BSC | $1-5 USD | 1-3 min |
| Sepolia (Testnet) | Gratis | 1-5 min |

## 🔒 Seguridad y Mejores Prácticas

### 1. Antes del Despliegue
- ✅ Auditar el código del contrato
- ✅ Probar exhaustivamente en testnet
- ✅ Verificar todas las funciones
- ✅ Revisar permisos de owner

### 2. Después del Despliegue
- ✅ Verificar el contrato en Etherscan
- ✅ Hacer backup de las claves privadas
- ✅ Configurar multisig para el owner
- ✅ Documentar todas las direcciones

### 3. Monitoreo Continuo
- 📊 Seguimiento de transacciones
- 🔍 Análisis de eventos del contrato
- 📈 Monitoreo del suministro total
- ⚠️ Alertas de actividad sospechosa

## 🎯 Integración con FAGESAS

### 1. Conexión con Backend
```javascript
// Ejemplo de integración con Supabase
const { supabase } = require('@supabase/supabase-js');

async function recordTransaction(txHash, from, to, amount) {
  const { data, error } = await supabase
    .from('fagecoin_transactions')
    .insert([
      {
        transaction_hash: txHash,
        from_address: from,
        to_address: to,
        amount: amount,
        timestamp: new Date()
      }
    ]);
}
```

### 2. Funciones Premium
```javascript
// Verificar status premium
async function checkPremiumStatus(userAddress) {
  const isPremium = await fageCoinContract.methods.premiumUsers(userAddress).call();
  return isPremium;
}

// Activar premium
async function activatePremium(userAddress) {
  await fageCoinContract.methods.setPremiumStatus(userAddress, true).send({
    from: ownerAddress
  });
}
```

## 📞 Soporte y Troubleshooting

### Problemas Comunes

1. **"Insufficient funds for gas"**
   - Solución: Asegúrate de tener ETH suficiente para gas

2. **"Contract creation failed"**
   - Solución: Verifica la configuración de red y gas limit

3. **"Invalid address"**
   - Solución: Revisa que las direcciones sean válidas checksummed

### Contacto de Soporte
- 📧 Email: support@fagesas.com
- 💬 Telegram: @FAGESAS_Support
- 🌐 Web: https://fagesas.com/support

## 📈 Roadmap Técnico

### Fase 1 (Actual) ✅
- Despliegue del token básico
- Integración con MetaMask
- Funcionalidades de staking

### Fase 2 (Q2 2025)
- Bridge multi-chain
- Pools de liquidez
- Governance token features

### Fase 3 (Q3 2025)
- NFT marketplace integration
- Advanced DeFi features
- Mobile wallet app

---

**⚠️ Disclaimer**: Este es un contrato inteligente en blockchain. Las transacciones son irreversibles. Asegúrate de probar todo en testnet antes del despliegue en mainnet.