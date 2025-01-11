import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './ShowProductSkeleton.css';

export default function ShowProductSkeleton() {
    return (
        <Stack spacing={1} id='card-container' className='show-product-skeleton'>
            {/* Navbar */}
            <Skeleton variant="rectangular" width="100%" height={58} style={{ marginTop: 0 }} />

            <div className='card'>
                {/* Product Img */}
                <Skeleton variant="rectangular" width="100%" height={830} className="card-img-top" style={{ marginTop: 2 }} />

                <div id="product-details">
                    {/* Breadcrumb */}
                    <Skeleton variant="rectangular" width="75%" height={24} style={{ marginTop: 10, marginLeft: 5, borderRadius: 5 }} />

                    {/* Product Name */}
                    <Skeleton variant="rectangular" width="65%" height={24} style={{ marginTop: 10, marginLeft: 5, borderRadius: 5 }} />

                    {/* Product weight */}
                    <Skeleton variant="rectangular" width="20%" height={15} style={{ marginTop: 10, marginLeft: 5, borderRadius: 5 }} />

                    {/* Price and Add Button */}
                    <div className='price-addToCart'>
                        <Skeleton variant="rectangular" width="15%" height={24} style={{ marginTop: 10, marginLeft: 10, borderRadius: 5 }} />
                        <Skeleton variant="rectangular" width="20%" height={28} style={{ marginTop: 10, marginRight: 10, borderRadius: 5 }} />

                    </div>

                    {/* Product Highlights */}
                    <Skeleton id='product-highlights' variant="rectangular" width="98%" height={38} style={{ marginTop: 35, marginLeft: 5, marginRight: 5 }} />

                    {/* About Product */}
                    <Skeleton id='accordion' variant="rectangular" width="98%" height={48} style={{ margin: 5 }} />

                    {/* Edit and Delete Button */}
                    <div className='showpage-button'>
                        <Skeleton variant="rectangular" width="90%" height={38} style={{ marginTop: 0, margin: 5 }} />

                        <Skeleton variant="rectangular" width="90%" height={38} style={{ margin: 5 }} />
                    </div>
                </div>
            </div>
        </Stack >
    )

}