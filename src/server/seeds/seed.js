const mongoose = require('mongoose');
const Product = require('../models/Product'); // Path to the Product model

mongoose.connect('mongodb://localhost:27017/fresh-from-farm')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Sample data for products
const products = [
    {
        name: 'Onion(Vengayam)',
        price: 98,
        quantity: '1 kg',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196212/onion_kmpvhs.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Coconut Small',
        price: 43,
        quantity: '200-400 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196196/coconut_emmomo.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Tomato Country',
        price: 24,
        quantity: '500 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196222/tomato_pvljfa.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Lady Fingers',
        price: 17,
        quantity: '250 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196207/lady_finger_rx8jkp.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Carrot Ooty',
        price: 83,
        quantity: '500 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/carrot_m629gx.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Cauliflower',
        price: 38,
        quantity: '1 Piece (Approx. 350gms above)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/cauliflower_h152dp.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Green Peas (Pachchai Pattani)',
        price: 15,
        quantity: '250 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196202/Green-Peas-Pachchai-Pattani_rjxoin.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Potato Ooty',
        price: 63,
        quantity: '1 kg',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196219/Potato_Ooty_ietd46.webp',
        category: 'fresh-vegetables',
    },
    {
        name: 'Grapes Green Sonaka',
        price: 83,
        quantity: '500 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196201/Grapes-Green-Sonaka_xh509u.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Strawberry',
        price: 71,
        quantity: '1 pack (Approx. 160g - 180g)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196220/Strawberry_cukgvd.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Apple Iran Premium',
        price: 132,
        quantity: '4 piece',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196194/Apple-Iran-Premium_oni2gw.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Pineapple (Annachi Pazham)',
        price: 69,
        quantity: '1 pc (Approx. 750g - 1 kg)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196218/Pineapple-Annachi-Pazham-_cfn6i7.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Pomegranate Premium',
        price: 117,
        quantity: '2 piece',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196219/Pomegranate-Premium_zlftjs.webp',
        category: 'fresh-fruits',
    },
    {
        name: 'Mint Leaves',
        price: 10,
        quantity: 'Approx. 80g - 100g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196209/Mint-Leaves_o9asiu.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Green Chilli (Pachchai Milagai)',
        price: 6,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196202/Green-Chilli-Pachchai-Milagai-_wxiz2c.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Curry Leaves (Karuveppilai)',
        price: 6,
        quantity: '50 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196198/Curry-Leaves-Karuveppilai-Cleaned-without-roots_pueo0m.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Coriander Leaves (Koththamalli)',
        price: 5,
        quantity: '1 Bunch (Approx. 80g - 100gm)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196196/Coriander-Leaves-Koththamalli-Cleaned-with-roots_bur579.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Garlic',
        price: 73,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196199/Garlic_uve4zx.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Ginger (Inji)',
        price: 14,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196214/Organic-Ginger-Inji-_itzaxv.webp',
        category: 'leafy-herbs-seasonings',
    },
    {
        name: 'Pepper Pack (Capsicum Tricolour)',
        price: 120,
        quantity: '1 piece each',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196217/Pepper-Pack-Capsicum-Tricolour-_ujrcqe.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Orange Imported',
        price: 123,
        quantity: '4 piece',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196213/Orange-Imported_gze8od.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Plum Imported',
        price: 44,
        quantity: '250 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196218/Plum-Imported_jlmktr.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Guava Thai',
        price: 48,
        quantity: '2 Pcs (Approx. 400g-500g)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196203/Guava-Thai_nieiqz.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Flyberry Gourmet Blueberries Apple Juice Infused',
        price: 279,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196198/Flyberry-Gourmet-Blueberries-Apple-Juice-Infused_pr17bc.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Lettuce Green',
        price: 16,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196207/Lettuce-Green_ctdj5y.webp',
        category: 'exotics-premium',
    },
    {
        name: 'Organic Banana Nendran',
        price: 112,
        quantity: '250 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196213/Organic-Banana-Nendran_tnaaop.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Organic Onion (Periya Vengayam)',
        price: 63,
        quantity: '500 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196213/Organic-Certified-Onion-Periya-Vengayam-_ozwiiu.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Organic Ginger (Inji)',
        price: 36,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196214/Organic-Ginger-Inji-_itzaxv.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Organic Potato (Urulaikilangu)',
        price: 43,
        quantity: '475 - 525 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196215/Organic-Potato-Urulaikilangu-_v7gisw.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Organic Lady Finger',
        price: 17,
        quantity: '250 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196214/Organic-Lady-Finger_ganytw.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Organic Tomato Hybrid',
        price: 16,
        quantity: '500 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196216/Organic-Tomato-Hybrid_b0vwjq.webp',
        category: 'organics-hydroponics',
    },
    {
        name: 'Sweet Corn Peeled',
        price: 29,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196222/Sweet-Corn-Peeled_nk0shz.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Coconut Cut',
        price: 38,
        quantity: '150 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196829/Coconut-Cut_wpbrfb.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Green Peas Peeled',
        price: 67,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196203/Green-Peas-Peeled_zqhc6f.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Garlic Peeled',
        price: 68,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196199/Garlic-Peeled_xdo98v.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Mix Sprouts',
        price: 27,
        quantity: '175 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196829/Mix-Sprouts_qtocum.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'Gourmet Garden Pumpkin Yellow Cut',
        price: 23,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196200/Gourmet-Garden-Pumpkin-Yellow-Cut_wfvjej.webp',
        category: 'cuts-sprouts',
    },
    {
        name: 'FNP Lovely Red Roses Flower Bouquet',
        price: 254,
        quantity: '1 bouquet',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196198/FNP-Lovely-Red-Roses-Flower-Bouquet_qwvrgh.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Fresh Shevanthi White',
        price: 30,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196199/Fresh-Shevanthi-White_v3p5zw.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Fresh Shevanthi Yellow',
        price: 37,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196930/Fresh-Shevanthi-Yellow_abr0lr.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Button Rose',
        price: 30,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/Button-Rose_frukpf.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Betel Leaves (Pan)',
        price: 10,
        quantity: '10 pcs',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/Betel-Leaves-Pan-_nibhk3.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Arugampul /Durva Grass',
        price: 6,
        quantity: '1 bunch (10 g)',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196194/Arugampul-Durva-Grass_v6p8uu.webp',
        category: 'flowers-leaves',
    },
    {
        name: 'Bloom Money Plant',
        price: 128,
        quantity: '1 plant',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/Bloom-Money-Plant_htqe8d.webp',
        category: 'plants-gardening',
    },
    {
        name: 'Bloom 2 Layer Lucky Bamboo Plant',
        price: 30,
        quantity: '1 plant',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/Bloom-2-Layer-Lucky-Bamboo-Plant_skthvh.webp',
        category: 'plants-gardening',
    },
    {
        name: `Nature's Plus Coco Peat Pouch`,
        price: 44,
        quantity: '1 kg',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196210/Nature-s-Plus-Coco-Peat-Pouch_ubxy2w.webp',
        category: 'plants-gardening',
    },
    {
        name: 'Peas - Seeds',
        price: 36,
        quantity: '1 piece',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196216/Peas-Seeds_og2s3o.webp',
        category: 'plants-gardening',
    },
    {
        name: `Nature's Plus Organic Fertiliser`,
        price: 66,
        quantity: '1 kg',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196211/Nature-s-Plus-Organic-Fertiliser_krxiuh.webp',
        category: 'plants-gardening',
    },
    {
        name: 'Bloom Peace Lily Plant',
        price: 128,
        quantity: '1 plant',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196195/Bloom-Peace-Lily-Plant_ujsxkh.webp',
        category: 'plants-gardening',
    },
    {
        name: 'Khari Foods Roseberry Dried',
        price: 82,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196206/Khari-Foods-Roseberry-Dried_cxxlo7.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Khari Foods Superfoods Gift Box',
        price: 484,
        quantity: '650 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196207/Khari-Foods-Superfoods-Gift-Box_aq0m8r.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Khari Foods Baby Orange Dried',
        price: 129,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196203/Khari-Foods-Baby-Orange-Dried_rdbc9k.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Khari Foods Pineapple Dried',
        price: 139,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196206/Khari-Foods-Pineapple-Dried_bmnxuk.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Khari Foods Fruit Mix Dried',
        price: 202,
        quantity: '200 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196204/Khari-Foods-Fruit-Mix-Dried_djv5ki.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Khari Foods Blueberry Dried',
        price: 199,
        quantity: '100 g',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734197099/Khari-Foods-Blueberry-Dried_ocy4at.webp',
        category: 'dried-dehydrated',
    },
    {
        name: 'Chyll Tender Coconut Water',
        price: 45,
        quantity: '200 ml',
        imgUrl: 'https://res.cloudinary.com/dkywndf0x/image/upload/v1734196196/Chyll-Tender-Coconut-Water_oioskr.webp',
        category: 'fresh-juices',
    },
];

// Seed the database
const seedDB = async () => {
    await Product.deleteMany({});
    for (let product of products) {
        const newProduct = new Product(product);
        await newProduct.save();
        console.log(`Added product: ${newProduct.name}`);
    }
};

// Run the seed function and close the connection
seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database seeding completed, connection closed.');
});