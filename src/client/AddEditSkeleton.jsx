import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function AddEditSkeleton() {
    return (


        <Stack spacing={1} className='AddProductForm'>
            <Skeleton variant="rectangular" width="100%" height={60} />
            <div className='form-container'>
                {/* Form Title */}
                <Skeleton variant="rectangular" width="50%" height={30} style={{ borderRadius: 5 }} />
                <div id="formContainer">
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: 20, borderRadius: 5 }} />
                </div>
            </div>



        </Stack >


    )

}