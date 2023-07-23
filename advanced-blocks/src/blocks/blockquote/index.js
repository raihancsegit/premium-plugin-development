//  Import CSS.
import './style/style.scss';
import './style/editor.scss';

// Import JS
import { QuoteIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'advanced-blocks/blockquote', {
    
    title: __( 'Blockquote' ),
    
    description: __('Add quoted text'),
    
    keywords: [__('blockquote'), __('quote')],
    
    icon: 'admin-comments',
    
    category: 'advanced-blocks',
    
    attributes: {

        quote: {
            type: 'array',
            source: 'children',
            selector: 'p',
            default: 'Great things in business are never done by one person. They\'re done by a team of people.',
        },
        
        cite: {
            type: 'array',
            source: 'children',
            selector: 'cite',
            default: 'Steve Jobs',
        },
        
        alignment: {
            type: 'string',
        },
        
        borderColor: {
            type: 'string',
            default: '#F9583B',
        },
        
        borderSize: {
            type: 'string',
            default: '4',
        },
        
        borderPosition: {
            type: 'string',
            default: 'left',
        },
        
        backgroundColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        
        textColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        
    },
    
    edit: Edit,
    
    save: ( props ) => {

        const { 
            textColor, 
            alignment, 
            backgroundColor, 
            borderPosition, 
            borderSize, 
            borderColor,
            quote,
            cite
        } = props.attributes
    
        const style = {
            'text-align': alignment,
            'background-color': backgroundColor,
            'color': textColor,
            [ 'border-' + borderPosition ]: borderSize + 'px solid ' + borderColor,	
        };
            
        return (
            <blockquote className = { 'bokez-blockquote' } style = { style } >
                <p>{ quote }</p>
                <cite style = {{ 'text-align' : alignment }} >{ cite }</cite>
            </blockquote>
        );
    },
})

