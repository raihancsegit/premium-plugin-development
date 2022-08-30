//  Import CSS.
import './style/style.scss';
import './style/editor.scss';

// Import JS
import { Edit } from './edit'
import { ProgressBarIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'advanced-blocks/progress-bar', {

    title: __( 'Progress Bar' ),
    
    description: __('Add beautiful customized progress bar.'),
    
    keywords: [__('progress'), __('bar'), __('skill')],
    
    icon: 'lightbulb',
    
    category: 'advanced-blocks',
    
    attributes: {
		message: {
            type: 'string',
            selector: '.bokez-progress-bar-wrapper p',
            default: 'Html',
        },
        progress: {
            type: 'string',
            default: '50%'
        },
        textColor: {
            type: 'string',
            default: '#F9583B'
        },
		backgroundColor: {
            type: 'string',
            default: '#f5f5f5'
        },
        progressColor: {
            type: 'string',
            default: '#F9583B'
        },
        tooltipColor: {
            type: 'string',
            default: '#f5f5f5'
        },
        tooltipBackgroundColor: {
            type: 'string',
            default: '#F9583B'
        },
		uid: {
            type: 'string',
            default: ''
        }
    },
    
    edit: Edit,
    
    save: ( props ) => {
    
        const {
			message,
			uid,
            progress,
			textColor,
            progressColor,
            backgroundColor,
            tooltipBackgroundColor,
            tooltipColor
        } = props.attributes;
    
        return (
    
            <div id = { uid } key={ 'progress-bar' } className={ 'c-prog bokez-progress-bar-wrapper' } >
               <RichText.Content 
                    tagName = { 'p' }
                    value = { message }
					style = {{ 'color': textColor }}
                />
                <div className = { 'bokez-progress-bar' } style = { { 'background-color': backgroundColor } } >
					
                    <div className = { 'bokez-progress-bar-progress' } style = { { 'background-color': progressColor , 'width' : progress } } >
                        
                        <div className = { 'bokez-progress-bar-tooltip' } style = { { 'background-color': tooltipBackgroundColor , 'color' : tooltipColor } } >{ progress }
                            
                            <span style = { { 'border-top-color': tooltipBackgroundColor } } ></span>
                        
                        </div>
                    
                    </div>  
                
                </div>
    
            </div>
        
        );
        
    },
})

