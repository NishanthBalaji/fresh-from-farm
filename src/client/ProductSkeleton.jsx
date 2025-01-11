import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ProductSkeleton({ n }) {
    return (
        <>
            {Array.from({ length: n }).map((_, index) => (
                <div key={index} style={{ marginBottom: 20 }} className='product-skeleton-col'>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={159}
                        height={159}
                        style={{ marginTop: 10, marginLeft: 1, borderRadius: 10 }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={100}
                        height={10}
                        style={{ marginTop: 10, marginLeft: 10, borderRadius: 10 }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={100}
                        height={10}
                        style={{ marginTop: 35, marginLeft: 10, borderRadius: 10 }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={50}
                        height={10}
                        style={{ marginTop: 30, marginLeft: 10, borderRadius: 10 }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={155}
                        height={40}
                        style={{ marginTop: 10, marginLeft: 1, borderRadius: 10 }}
                    />
                </div>
            ))}


        </>
    );

}