const mongoose = require('mongoose');
const OEM_Specs = require('../models/product');

mongoose.connect('mongodb+srv://admin:admin@sachincluster.yrpwpdu.mongodb.net/Sachincluster?retryWrites=true&w=majority');

const sampleData =[
        {
            "model": "Honda City",
            "year": 2015,
            "listPrice": 20000,
            "colors": "Red",
            "mileage": 18.5,
            "powerBHP": 120,
            "maxSpeed": 180,
            "image": "https://stimg.cardekho.com/images/car-images/large/Honda/Honda-City/Carnelian-red-pearl.jpg?impolicy=resize&imwidth=420"
        },
        {
            "model": "Honda City",
            "year": 2017,
            "listPrice": 25000,
            "colors": "Blue",
            "mileage": 21.5,
            "powerBHP": 120,
            "maxSpeed": 180,
            "image": "https://i.pinimg.com/736x/c9/b0/9e/c9b09e504ee6c83af0843703316cf252.jpg"
        },
        {
            "model": "Toyota Camry",
            "year": 2020,
            "listPrice": 35000,
            "colors": "Black",
            "mileage": 22.0,
            "powerBHP": 200,
            "maxSpeed": 200,
            "image": "https://imgd-ct.aeplcdn.com/1056x660/n/hn7kpua_1557405.jpg?q=80"
        },
        {
            "model": "BMW X5",
            "year": 2018,
            "listPrice": 60000,
            "colors": "Silver",
            "mileage": 16.5,
            "powerBHP": 300,
            "maxSpeed": 250,
            "image": "https://stimg.cardekho.com/images/car-images/large/BMW/Colors/BMW-X5/bmw-x5-titanium-silver.jpg?impolicy=resize&imwidth=420"
        },
        {
            "model": "Ford Mustang",
            "year": 2017,
            "listPrice": 45000,
            "colors": "Blue",
            "mileage": 15.0,
            "powerBHP": 350,
            "maxSpeed": 220,
            "image": "https://images-stag.jazelc.com/uploads/garycrossleyford-m2en/My-project-20.png"
        },
        {
            "model": "Chevrolet Cruze",
            "year": 2019,
            "listPrice": 28000,
            "colors": "White",
            "mileage": 20.5,
            "powerBHP": 180,
            "maxSpeed": 200,
            "image": "https://di-uploads-pod16.dealerinspire.com/beaverchevy/uploads/2019/05/2019-Chevrolet-Cruze-in-white.png"
        },
        {
            "model": "Nissan Altima",
            "year": 2016,
            "listPrice": 22000,
            "colors": "Gray",
            "mileage": 21.0,
            "powerBHP": 150,
            "maxSpeed": 190,
            "image": "https://edgecast-img.yahoo.net/mysterio/api/9E25EF3E194751A5C22F78CEFD250EE6ED921ED943D308EDA43C879FFDE51DF1/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60NIC041C021001.jpg"
        },
        {
            "model": "Audi A4",
            "year": 2021,
            "listPrice": 50000,
            "colors": "Black",
            "mileage": 25.0,
            "powerBHP": 220,
            "maxSpeed": 240,
            "image": "https://dealer-content.s3.amazonaws.com/images/models/audi/2021/a4/colors/mythos-black-metallic.png"
        },
        {
            "model": "Mercedes-Benz C-Class",
            "year": 2019,
            "listPrice": 55000,
            "colors": "Silver",
            "mileage": 18.0,
            "powerBHP": 280,
            "maxSpeed": 230,
            "image": "https://imgd.aeplcdn.com/370x208/n/g1cll3a_1579023.jpg?q=80"
        },
        {
            "model": "Hyundai Sonata",
            "year": 2018,
            "listPrice": 30000,
            "colors": "Blue",
            "mileage": 19.5,
            "powerBHP": 170,
            "maxSpeed": 210,
            "image": "https://cars.usnews.com/static/images/Auto/izmo/Colors/hyundai_18sonatalimitedsd7fa_electricblue.jpg"
        },
        {
            "model": "Volkswagen Passat",
            "year": 2017,
            "listPrice": 32000,
            "colors": "Red",
            "mileage": 17.5,
            "powerBHP": 160,
            "maxSpeed": 200,
            "image": "https://www.ezoomed.in/wp-content/uploads/2021/07/ev-1-4.jpg"
        },
        {
            "model": "Ford Fusion",
            "year": 2016,
            "listPrice": 25000,
            "colors": "Silver",
            "mileage": 20.0,
            "powerBHP": 180,
            "maxSpeed": 200,
            "image": "https://www.motortrend.com/uploads/sites/5/2020/06/2020-ford-fusion-hybrid.png?fit=around%7C875:492.1875"
        },
        {
            "model": "Toyota Corolla",
            "year": 2019,
            "listPrice": 28000,
            "colors": "White",
            "mileage": 22.5,
            "powerBHP": 150,
            "maxSpeed": 190,
            "image": "https://stimg.cardekho.com/images/car-images/large/Toyota/Toyota-Corolla-Altis/white-pearl-crystal-shine.jpg?impolicy=resize&imwidth=420"
        },
        {
            "model": "Chevrolet Malibu",
            "year": 2018,
            "listPrice": 27000,
            "colors": "Blue",
            "mileage": 21.0,
            "powerBHP": 160,
            "maxSpeed": 200,
            "image": "https://di-uploads-pod2.dealerinspire.com/carlblackchevynashville/uploads/2018/05/chevrolet_malibu2018_blue.png"
        },
        {
            "model": "Honda Accord",
            "year": 2020,
            "listPrice": 32000,
            "colors": "Black",
            "mileage": 23.5,
            "powerBHP": 200,
            "maxSpeed": 210,
            "image": "https://di-uploads-pod11.dealerinspire.com/hondaofkirkland/uploads/2020/02/2020-Accord-Crystal-Black-Pearl.png"
        },
        {
            "model": "Volkswagen Jetta",
            "year": 2016,
            "listPrice": 24000,
            "colors": "Black",
            "mileage": 18.5,
            "powerBHP": 150,
            "maxSpeed": 195,
            "image": "https://www.cars.com/i/large/in/v2/stock_photos/1047ae70-e1c4-4eb8-9ce3-51194cfa1f81/4004382b-e646-4682-a99d-ed7525734b57.png"
        },
        {
            "model": "Mazda 6",
            "year": 2018,
            "listPrice": 26000,
            "colors": "Silver",
            "mileage": 19.0,
            "powerBHP": 160,
            "maxSpeed": 200,
            "image": "https://www.motortrend.com/uploads/sites/10/2019/12/2020-mazda-mazda6-sport-sedan-angular-front.png"
        },
        {
            "model": "Kia Optima",
            "year": 2019,
            "listPrice": 30000,
            "colors": "Blue",
            "mileage": 22.0,
            "powerBHP": 180,
            "maxSpeed": 210,
            "image": "https://www.tomkadleckia.com/static/dealer-12262/Top_Sellers_Template/Optima/colors/exterior/kia_optima_2020-gallery_exterior-horizon-blue.png"
        },
        {
            "model": "Subaru Legacy",
            "year": 2017,
            "listPrice": 27000,
            "colors": "White",
            "mileage": 20.5,
            "powerBHP": 170,
            "maxSpeed": 205,
            "image": "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13553/2020-Subaru-Legacy-front_13553_032_2400x1800_K1X.png"
        },
        {
            "model": "Chrysler 300",
            "year": 2020,
            "listPrice": 35000,
            "colors": "Red",
            "mileage": 25.5,
            "powerBHP": 220,
            "maxSpeed": 220,
            "image": "https://www.carscoops.com/wp-content/uploads/2020/06/2020-chrysler-300-touring-l-0.jpg"
        },
        {
            "model": "Buick Regal",
            "year": 2018,
            "listPrice": 31000,
            "colors": "Black",
            "mileage": 23.0,
            "powerBHP": 200,
            "maxSpeed": 215,
            "image": "https://edgecast-img.yahoo.net/mysterio/api/B99E7811BC7E2578B682788B2FD09509E1DBFA69C26D668D9B939907382F488E/autoblog/resizefill_w788_h525;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC80BUC191C021001.jpg"
        },
        {
            "model": "Acura TLX",
            "year": 2016,
            "listPrice": 26000,
            "colors": "Gray",
            "mileage": 21.5,
            "powerBHP": 190,
            "maxSpeed": 205,
            "image": "https://www.motortrend.com/uploads/sites/10/2019/05/2020-acura-tlx-sedan-angular-front.png?fit=around%7C551:374"
        },
        {
            "model": "Lexus ES",
            "year": 2019,
            "listPrice": 38000,
            "colors": "Silver",
            "mileage": 24.5,
            "powerBHP": 250,
            "maxSpeed": 230,
            "image": "https://dealer-content.s3.amazonaws.com/images/models/lexus/2021/es-350/silver-lining-metallic.png"
        },
        {
            "model": "Infiniti Q50",
            "year": 2017,
            "listPrice": 33000,
            "colors": "Blue",
            "mileage": 22.0,
            "powerBHP": 220,
            "maxSpeed": 220,
            "image": "https://di-uploads-pod16.dealerinspire.com/infinitiofnaperville1/uploads/2018/08/20Infinity-Q50-Jellybean-Sport-IridiumBlue.png"
        },
        {
            "model": "Genesis G80",
            "year": 2021,
            "listPrice": 42000,
            "colors": "Black",
            "mileage": 26.0,
            "powerBHP": 270,
            "maxSpeed": 240,
            "image": "https://vehicle-images.dealerinspire.com/stock-images/thumbnails/large/chrome/3ea8cc383d18148c53796754a4a8fc67.png"
        },
        {
            "model": "Jaguar XF",
            "year": 2018,
            "listPrice": 45000,
            "colors": "Red",
            "mileage": 25.0,
            "powerBHP": 280,
            "maxSpeed": 245,
            "image": "https://stimg.cardekho.com/images/car-images/large/Jaguar/Jaguar-XF/Jaguar-XF-R-Supercharged-5.0-Litre-V8-Petrol/Italian-Racing-Red-Metallic.jpg?impolicy=resize&imwidth=420"
        },
        {
            "model": "Tesla Model 3",
            "year": 2020,
            "listPrice": 50000,
            "colors": "White",
            "mileage": 30.0,
            "powerBHP": 350,
            "maxSpeed": 250,
            "image": "https://imgd.aeplcdn.com/370x208/n/kqn9cva_1595897.jpg?q=80"
        },
        {
            "model": "Porsche Panamera",
            "year": 2019,
            "listPrice": 80000,
            "colors": "Silver",
            "mileage": 28.5,
            "powerBHP": 400,
            "maxSpeed": 270,
            "image": "https://stimg.cardekho.com/images/car-images/large/Porsche/Porsche-Panamera/5541/Dolomite-Silver-Metallic_bbc0c3.jpg?impolicy=resize&imwidth=420"
        },
        {
            "model": "Ferrari 488 GTB",
            "year": 2017,
            "listPrice": 300000,
            "colors": "Yellow",
            "mileage": 15.0,
            "powerBHP": 660,
            "maxSpeed": 330,
            "image": "https://i.pinimg.com/736x/2f/cf/1e/2fcf1ed7c58b878ffeffafb77ee0bd28.jpg"
        }
    ];


async function insertSampleData() {
    try {
        await OEM_Specs.deleteMany();
        await OEM_Specs.insertMany(sampleData);
        console.log('OEM data inserted successfully!');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    } finally {
        mongoose.connection.close();
    }
}

insertSampleData();