import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const SocialLogin = () => {
   const {googleSignIn} = useContext(AuthContext);
   const handleGooleLogin = ()=>{
      googleSignIn()
      .then(result=>{
         console.log(result.user)
      })
      .then(error=>console.log(error))
   }
   return (
      <div>
         <div className="divider">OR</div>
         <div className="text-center">
            <button onClick={handleGooleLogin} className="btn btn-circle btn-outline">
              G
            </button>
         </div>
      </div>
   );
};

export default SocialLogin;