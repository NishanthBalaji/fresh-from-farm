import './Category.css'

export default function Category({ category, activeCategory }) {
    let newCategoryName = '';

    if (category.name.length > 22) {
        newCategoryName = category.name.slice(0, 14);
    }
    else {
        newCategoryName = category.name;
    }

    let urlName = category.name.replace(/[, &]+/g, '-').toLowerCase();

    const isActive = activeCategory === category.url;

    return (
        <a href={`/product/${urlName}`} className='category-link'>
            <div className={`Category ${urlName} ${isActive ? 'active' : ''}`}>
                <div id='category-img'>
                    <img src={category.imgUrl} alt={category.name} />
                </div>
                <div id='category-name'>
                    <p className="new-category">{newCategoryName}</p>
                    <p className="original-category">{category.name}</p>
                </div>

            </div>
        </a>

    )
}