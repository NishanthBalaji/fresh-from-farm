import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function HomeSkeleton() {
    return (
        <Stack spacing={1} className='Home'>
            <div className='all-content'>
                <div className='content'>
                    <Skeleton variant="rectangular" width="70%" height={60} style={{ marginTop: 15, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="90%" height={80} style={{ marginTop: 30, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="45%" height={40} style={{ marginTop: 30, borderRadius: 5 }} />
                </div>
            </div>


        </Stack >
    )

}