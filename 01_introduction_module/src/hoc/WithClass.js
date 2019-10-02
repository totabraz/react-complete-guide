
import React from "react";

const withClass = (WrapedComponent, className) => {
    return props => (
        <div className={className}>
            {/**
            {...props} -> this will distribute all key values for each component.. 
            */} 
            <WrapedComponent {...props}/>
        </div>
    );
};

export default withClass;