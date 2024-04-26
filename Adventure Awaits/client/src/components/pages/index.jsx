import {Outlet} from 'react-router-dom'

function Page (  {currentPage})  {
    const page = currentPage.substring(1)
    console.log(page);
    return (
    <div> <Outlet/> </div>
    )
}

export default Page ;