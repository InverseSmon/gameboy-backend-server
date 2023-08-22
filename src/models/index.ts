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
    shell: String;
    lens: String;
    dpad: String;
    ab: String;
    stasel: String;
    Screen: String;
    AudioSpeaker: String;
    AudioMod: String;
    Power: String;
    Battery: String;
    LED: String;
    Other: String;
}

export const CustomerRequest: ModelStatic<ICustomerRequest> = sequelize.define(
    "CustomerRequest",
    {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        shell: {
            type: DataTypes.STRING,

            // allowNull defaults to true
        },
        lens: {
            type: DataTypes.STRING,

            // allowNull defaults to true
        },
        dpad: {
            type: DataTypes.STRING,

            // allowNull defaults to true
        },
        ab: {
            type: DataTypes.STRING,

            // allowNull defaults to true
        },
        stasel: {
            type: DataTypes.STRING,

            // allowNull defaults to true
        },
        Screen: {
            type: DataTypes.STRING,
        },
        AudioSpeaker: {
            type: DataTypes.STRING,
        },
        AudioMod: {
            type: DataTypes.STRING,
        },
        Power: {
            type: DataTypes.STRING,
        },
        Battery: {
            type: DataTypes.STRING,
        },
        LED: {
            type: DataTypes.STRING,
        },
        Other: {
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
    await CustomerRequest.sync({ alter: true });
    console.log(
        "The tables for the Mod, Supplier, and Request models were just (re)created!"
    );
}

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true

console.log(Mod === sequelize.models.Mod);
