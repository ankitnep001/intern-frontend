import { image } from '@config/constant/image'
const Hero = () => {
    return (
        <div className="p-14  flex flex-col md:flex-row justify-center items-center gap-2">
            <div className='flex-1 '>
                <h1 className="text-lg md:text-xl lg:text-3xl font-bold py-3">
                    This is <span className=' '>Inter</span> Project.
                </h1>

                <p className="text-justify font-serif ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error eos animi quasi harum sed accusantium deleniti minus ad, neque vel id nam
                    quis est cum itaque rem soluta quo commodi facilis. Tempora fuga unde obcaecati a vel numq
                    uam id, saepe facilis enim! Architecto delectus nisi tempora voluptas, odio expedita ipsam culpa deserunt cumq
                    ue? Modi inventore, voluptatem provident, assumenda expedita libero maxime alias amet, exercitationem aliquid consequatur ma
                    iores sapiente similique odio corporis atque id recusandae dolor non quod at in ea quos? Dolorum itaque sunt commodi dolor odit consequuntur ducimus
                    aliquam, archit
                    ecto quisquam repellat? Dicta quis vel iste eligendi itaque nemo.
                </p>
            </div>
            <div className='flex-1 mt-8 md:mt-0'>
                <img src={image.loginHeroRight} alt="" />
            </div>
        </div>
    )
}

export default Hero

