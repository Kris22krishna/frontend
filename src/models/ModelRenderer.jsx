import React from 'react';
import './models.css';
import DefaultModel from './DefaultModel';
import FractionModel from './FractionModel';
import BoxModel from './BoxModel';

/**
 * ModelRenderer handles dynamic selection of the question component based on 'model' prop.
 * Defaults to DefaultModel if no specific model is found.
 */
const ModelRenderer = ({ question, ...props }) => {
    // Determine which model to use. question.model is fetched from backend.
    const modelName = question.model || 'Default';

    switch (modelName) {
        case 'Fraction':
            return <FractionModel question={question} {...props} />;

        case 'Box':
            return <BoxModel question={question} {...props} />;

        case 'Default':
        default:
            return <DefaultModel question={question} {...props} />;
    }
};

export default ModelRenderer;
