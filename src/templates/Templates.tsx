import Footer from '@components/footer/Footer'
import Header from '@components/header/Header'
import HeroAnimation from '@components/home/HeroAnimation'
import { Outlet } from 'react-router-dom'

const Templates = () => {
    return (
        <>
            <HeroAnimation />
            <Header />
            <Outlet />
            <Footer />
        </>

    )
}

export default Templates