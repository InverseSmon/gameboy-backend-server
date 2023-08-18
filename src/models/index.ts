import { DataTypes, ModelStatic, Model } from "sequelize";
import { sequelize } from "../database";

/*interface IUser extends Model {
    id: number;
    firstName: String;
    lastName: String;
    createdAt: Date;
    updatedAt: Date;
}*/

interface IMod extends Model {
    id: number;
    name: String;
    class: String;
    price: number;
    imageRef: String;
    urlExtension: String;
}

export const Mod: ModelStatic<IMod> = sequelize.define(
    "Mod",
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productType: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        price: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
        },
        imageRef: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlExtension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        timestamps: false,
    }
);

interface ISupplier extends Model {
    id: number;
    supplierName: String;
    website: String;
}

export const Supplier: ModelStatic<ISupplier> = sequelize.define(
    "Supplier",
    {
        // Model attributes are defined here
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        timestamps: false,
    }
);

interface ICustomerRequest extends Model {
    id: number;
    email: String;
    shellColor: Array<number>;
    lensColor: Array<number>;
    dpadColor: Array<number>;
    abColor: Array<number>;
    staselColor: Array<number>;
    screenMod: String;
    audioSpeakerMod: String;
    audioMod: String;
    powerMod: String;
    batteryMod: String;
    ledMod: String;
    otherMod: String;
}

export const CustomerRequest: ModelStatic<ICustomerRequest> = sequelize.define(
    "CustomerRequest",
    {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        shellColor: {
            type: DataTypes.ARRAY(DataTypes.DECIMAL(17, 16)),

            // allowNull defaults to true
        },
        lensColor: {
            type: DataTypes.ARRAY(DataTypes.DECIMAL(17, 16)),

            // allowNull defaults to true
        },
        dpadColor: {
            type: DataTypes.ARRAY(DataTypes.DECIMAL(17, 16)),

            // allowNull defaults to true
        },
        abColor: {
            type: DataTypes.ARRAY(DataTypes.DECIMAL(17, 16)),

            // allowNull defaults to true
        },
        staselColor: {
            type: DataTypes.ARRAY(DataTypes.DECIMAL(17, 16)),

            // allowNull defaults to true
        },
        screenMod: {
            type: DataTypes.STRING,
        },
        audioSpeakerMod: {
            type: DataTypes.STRING,
        },
        audioMod: {
            type: DataTypes.STRING,
        },
        powerMod: {
            type: DataTypes.STRING,
        },
        batteryMod: {
            type: DataTypes.STRING,
        },
        ledMod: {
            type: DataTypes.STRING,
        },
        otherMod: {
            type: DataTypes.STRING,
        },
    },
    {
        // Other model options go here
    }
);

Supplier.hasMany(Mod);
Mod.belongsTo(Supplier);

export async function syncDb() {
    await Mod.sync({ alter: true });
    await Supplier.sync({ alter: true });
    await CustomerRequest.sync({ force: true });
    console.log(
        "The tables for the Mod, Supplier, and Request models were just (re)created!"
    );
}

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

console.log(Mod === sequelize.models.Mod);
