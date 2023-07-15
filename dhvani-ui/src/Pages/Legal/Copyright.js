import Img from "../../assets/volunteer/group-hands.jpg";

const Copyright = () => {
    return (
        <div>

            <div
                className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[25rem]"
                style={{ backgroundImage: `url(${Img})` }}
            >
                <div className="container my-auto px-6 pt-10">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Copyright Policy
                    </h2>
                </div>
            </div>

            <section className="container mx-auto px-6 my-16">
                <span className="tracking-wide text-lg">
                    Ownership of copyright – The material featured on this website (including without limitation; the text, computer code, artwork, photographs, images, music and video material on this website) is owned by Dhvani Foundation unless otherwise indicated. 
                    <br />
                    <br />
                    Copyright license – Dhvani Foundation grants to you a worldwide non-exclusive royalty-free revocable license to:
                    <ul className="list-disc list-inside">
                        <li>View this website and the material on this website on a computer or mobile device via a web browser.</li>
                        <li>Copy and store this website and the material on this website in your web browser cache memory.</li>
                        <li>Print pages from this website for your own personal and non-commercial use.</li>
                        <li>Use the pages of this website for the positive promotion of Dhvani Foundation.</li>
                        <li>Dhvani Foundation does not grant you any other rights in relation to this website or its content, all other rights are reserved.</li>
                    </ul>
                    <br />
                    
                    For the avoidance of doubt, you must not adapt, edit, change, transform, publish, republish, distribute, redistribute, broadcast, rebroadcast this website or the material on this website, in any form or media, without prior written permission from Dhvani Foundation. Data mining – The automated and/or systematic collection of data from this website is prohibited. 
                    <br />
                    <br />
                    
                    Permission – Permission to use the website content can be requested by contacting Dhvani Foundation. 
                    <br />
                    <br />
                    
                    Enforcement of copyright – Dhvani Foundation takes the protection of its copyright very seriously. If Dhvani Foundation discovers that you have used its copyright materials in contravention of this license, Dhvani Foundation may bring legal proceedings against you seeking monetary damages and an injunction to stop you using those materials. You could also be ordered to pay legal costs. If you become aware of any use of Dhvani Foundation copyright materials that contravenes or may contravene the license above, please contact Dhvani Foundation. 
                    <br />
                    <br />
                    
                    Infringing material – If you become aware of any material on the website that you believe infringes on your own or any other person’s copyright, please contact Dhvani Foundation. 
                    <br />
                    <br />
                    
                    Contacting us – If you have any questions about this Copyright notice, the practices of this site, or your dealings with this site, please contact us at: contact@dhvanifoundation.org 
                </span>
            </section>

        </div>
    )
}

export default Copyright