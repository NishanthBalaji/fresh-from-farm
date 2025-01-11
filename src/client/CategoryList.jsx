import { useParams } from "react-router-dom";
import Category from "./Category";
import './CategoryList.css'



export default function CategoryList() {

    const { category } = useParams();
    // console.log('Category Name:', category);

    const categories = [
        { name: "All", url: "all", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/all_fiplkg.webp" },
        { name: "Fresh Vegetables", url: "fresh-vegetables", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983133/fresh_vegetables_lzrnle.webp" },
        { name: "Fresh Fruits", url: "fresh-fruits", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/fresh_fruits_ppk1hk.webp" },
        { name: "Seasonal Picks", url: "seasonal-picks", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983135/seasonal_picks_ogc0dg.webp" },
        { name: "Leafy, Herbs & Seasonings", url: "leafy-herbs-seasonings", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983134/leafy_herbs_seasonings_tckqsd.webp" },
        { name: "Exotics & Premium", url: "exotics-premium", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/exotic_and_premium_mkn5gq.webp" },
        { name: "Organics & Hydroponics", url: "organics-hydroponics", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983134/organic_and_hydroponic_r3llvk.webp" },
        { name: "Cuts & Sprouts", url: "cuts-sprouts", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/cuts_and_sprouts_uqh6fj.webp" },
        { name: "Flowers & Leaves", url: "flowers-leaves", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/flower_and_leaves_jmhkom.webp" },
        { name: "Plants & Gardening", url: "plants-gardening", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983134/plants_and_gardening_xgijtj.webp" },
        { name: "Dried & Dehydrated", url: "dried-dehydrated", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983131/dried_and_dehydrated_xklor4.webp" },
        { name: "Fresh Juices", url: "fresh-juices", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983132/fresh_juices_ozc4ox.webp" },
        { name: "Fresh Salads", url: "fresh-salads", imgUrl: "https://res.cloudinary.com/dkywndf0x/image/upload/v1733983132/fresh_salads_ivnxpj.webp" }]

    return (
        <div className="CategoryList">
            {categories.map((cat) => {
                return (
                    <Category
                        key={cat.name}
                        category={cat}
                        activeCategory={category}
                    />
                );
            })}
        </div>
    )
}