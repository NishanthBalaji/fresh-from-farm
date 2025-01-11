import { pink } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import ProductSkeleton from './ProductSkeleton';

export default function ProductListSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={60} style={{ marginBottom: 5 }} />
            <Skeleton variant="rectangular" width="100%" height={30} style={{ marginTop: 0 }} />
            <Skeleton variant="rectangular" width="100%" height={30} style={{ marginTop: 5, marginBottom: 0 }} />
            <div id="skeleton-list">
                <Skeleton className='category-skeleton' variant="rectangular" width="18%" height={1000} style={{ marginRight: 5, marginTop: 0 }} />
                <div className="skeleton-product">
                    <ProductSkeleton n={12} />
                    <ProductSkeleton n={12} />
                </div>
            </div>
        </Stack >
    )

}

