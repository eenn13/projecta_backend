const sequelize = require('./config');
const User = require('./models/user');
const Share = require('./models/share');
const Log = require('./models/log');

async function init() {
  try {
    await sequelize.sync(); 
    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Error creating database and tables:', error);
  } finally {
    //sequelize.close();
  }
}

module.exports = init;



/*

init fonksiyonundaki try'ın içindeki bölüm
sequelize.sync({ force: true }) 
This will create the tables (force: true drops existing tables)
const usersToCreate = [
      {
        username: 'Jonathan',
        email: 'jonathan@example.com',
        password: 'password1',
        balance: 10664.12,
      },
      {
        username: 'Lora',
        email: 'lora@example.com',
        password: 'password2',
        balance: 50163.52,
      },
      {
        username: 'Tom',
        email: 'tom@example.com',
        password: 'password3',
        balance: 95632.35,
      },
      {
        username: 'Jerry',
        email: 'jerry@example.com',
        password: 'password4',
        balance: 7133.46,
      },
      {
        username: 'Jacob',
        email: 'jacob@example.com',
        password: 'password5',
        balance: 8862.12,
      }
    ];
    await User.bulkCreate(usersToCreate);

    const sharesToCreate = [
      {
        shareName: 'XUT',
        ownerId: 1,
        price: 124.56
      },
      {
        shareName: 'AHK',
        ownerId: 1,
        price: 54.37
      },
      {
        shareName: 'TKL',
        ownerId: 3,
        price: 884.27
      },
      {
        shareName: 'MNB',
        ownerId: 3,
        price: 4.19
      },
      {
        shareName: 'NOO',
        ownerId: 2,
        price: 5.10
      },
      {
        shareName: 'TLO',
        ownerId: 5,
        price: 10.16
      },
      {
        shareName: 'VVV',
        ownerId: 2,
        price: 3.42
      },
      {
        shareName: 'ASD',
        ownerId: 4,
        price: 4.62
      },
      {
        shareName: 'IOP',
        ownerId: 2,
        price: 410.14
      },
      {
        shareName: 'PLM',
        ownerId: 2,
        price: 1124.12
      }
    ];
    await Share.bulkCreate(sharesToCreate);

    const logsToCreate = [
      {
        userId: 1,
        shareId: 3,
        action: 'buy',
        price: 884.27
      },
      {
        userId: 1,
        shareId: 4,
        action: 'buy',
        price: 4.19
      },
      {
        userId: 3,
        shareId: 3,
        action: 'sell',
        price: 884.27
      },
      {
        userId: 3,
        shareId: 4,
        action: 'sell',
        price: 4.19
      },
      {
        userId: 2,
        shareId: 6,
        action: 'buy',
        price: 10.16
      },
      {
        userId: 2,
        shareId: 8,
        action: 'buy',
        price: 4.62
      },
      {
        userId: 5,
        shareId: 6,
        action: 'sell',
        price: 10.16
      },
      {
        userId: 4,
        shareId: 8,
        action: 'sell',
        price: 4.62
      },
      {
        userId: 5,
        shareId: 4,
        action: 'buy',
        price: 4.19
      },
      {
        userId: 5,
        shareId: 5,
        action: 'buy',
        price: 5.10
      },
      {
        userId: 3,
        shareId: 4,
        action: 'sell',
        price: 4.19
      },
      {
        userId: 2,
        shareId: 5,
        action: 'sell',
        price: 5.10
      },
      {
        userId: 5,
        shareId: 1,
        action: 'buy',
        price: 124.56
      },
      {
        userId: 4,
        shareId: 2,
        action: 'buy',
        price: 54.37
      },
      {
        userId: 1,
        shareId: 1,
        action: 'sell',
        price: 124.56
      },
      {
        userId: 1,
        shareId: 2,
        action: 'sell',
        price: 54.37
      },
      {
        userId: 1,
        shareId: 8,
        action: 'buy',
        price: 4.62
      },
      {
        userId: 3,
        shareId: 10,
        action: 'buy',
        price: 1124.12
      },
      {
        userId: 4,
        shareId: 8,
        action: 'sell',
        price: 4.62
      },
      {
        userId: 2,
        shareId: 10,
        action: 'sell',
        price: 1124.12
      },
      {
        userId: 3,
        shareId: 4,
        action: 'sell',
        price: 4.19
      }
    ];
    await Log.bulkCreate(logsToCreate);

    await Log.create({
      userId: 3,
      shareId: 4,
      action: 'set',
      price: 15.89
    });
    await Log.create({
      userId: 3,
      shareId: 4,
      action: 'set',
      price: 23.15
    });
    await Log.create({
      userId: 1,
      shareId: 1,
      action: 'set',
      price: 90.95
    });
    await Log.create({
      userId: 1,
      shareId: 1,
      action: 'set',
      price: 100.45
    });
    await Log.create({
      userId: 1,
      shareId: 1,
      action: 'set',
      price: 200.46
    });
*/