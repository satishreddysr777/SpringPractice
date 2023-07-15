import Img from "../../assets/volunteer/group-hands.jpg";

const TermsConditions = () => {
    return (
        <div>

            <div
                className="py-20 justify-center bg-no-repeat bg-cover bg-center h-[25rem]"
                style={{ backgroundImage: `url(${Img})` }}
            >
                <div className="container my-auto px-6 pt-10">
                    <h2 className="text-4xl font-bold mb-2 text-white">
                        Terms & Conditions
                    </h2>
                </div>
            </div>

            <section className="container mx-auto px-6 my-16">
                <span className="tracking-wide text-lg">
                    1. Terms <br />
                    By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright law. 
                    <br />

                    <br />
                    2. Use License <br />
                    Permission is granted to temporarily download one copy of the materials (information or software) on the Dhvani Foundation web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    
                    <ul className="list-disc list-inside">
                        <li>modify or copy the materials</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                        <li>attempt to decompile or reverse engineer any software contained on Dhvani Foundation web site</li>
                        <li>remove any copyright or other proprietary notations from the materials or</li>
                        <li>transfer the materials to another person or “mirror” the materials on any other server.</li>
                    </ul>

                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Dhvani Foundation at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format. <br />
                    <br />
                    
                    3. Disclaimer <br />
                    The materials on Dhvani Foundation web site are provided “as is”. Dhvani Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchant-ability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Dhvani Foundation does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site. <br />
                    <br />
                    
                    4. Limitations <br />
                    In no event shall Dhvani Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Dhvani Foundation Internet site, even if Dhvani Foundation or a Dhvani Foundation authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you. <br />
                    <br />
                    
                    5. Revisions and Errata <br />
                    The materials appearing on the Dhvani Foundation web site could include technical, typographical, or photographic errors. Dhvani Foundation does not warrant that any of the materials on its web site are accurate, complete, or current. Dhvani Foundation may make changes to the materials contained on its web site at any time without notice. Dhvani Foundation does not, however, make any commitment to update the materials. <br />
                    <br />
                    
                    6. Links <br />
                    Dhvani Foundation has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Dhvani Foundation of the site. Use of any such linked web site is at the user’s own risk. <br />
                    <br />
                    
                    7. Site Terms of Use Modifications <br />
                    Dhvani Foundation may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use. 
                </span>
            </section>

        </div>
    )
}

export default TermsConditions