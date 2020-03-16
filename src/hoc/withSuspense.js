import React, { Suspense } from "react";
import Preloader from "./../components/common/Preloader/Preloader";


export const withSuspense = (Component) => {



    return (props) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    }

    // class WithSuspenseComponent extends React.Component {
    //     render() {
    //         return (
    //         <Suspense fallback={<Preloader />}>
    //             <Component {...this.props}/>
    //         </Suspense>)
    //     }
    // }

    // return WithSuspenseComponent;
}