//  Import CSS.
import './style/style.scss';
import './style/editor.scss';

//  Import JS.
import { Edit } from './edit';
import { NotificationIcon, CloseIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'advanced-blocks/alert', {

    title: __( 'Alert' ),
    
    description: __('Add beautiful notice for your visitors.'),
    
    keywords: [__('alert'), __('notification'), __('error')],
    
    icon: 'editor-textcolor',
    
    category: 'advanced-blocks',
    
    attributes: {
        message: {
            type: 'string',
            source: 'children',
            selector: '.bokez-notification > p',
            default: 'This is an informational alert, have fun editing it.',
        },
        type: {
            type: 'string',
            default: 'warning',
        },
        alignment: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        textColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        borderRadius: {
            type: 'string',
            default: '0',
        },
        dismissible: {
            type: 'boolean',
            default: false
        },
        uid: {
            type: 'string',
            default: ''
        }
    },

    edit: Edit,
    
    save: ( props ) => {

        const { className } = props;
    
        const { 
            message,
            type,
            backgroundColor,
            textColor,
            dismissible,
            uid,
            alignment
        } = props.attributes
    
        const style = {
            'text-align': alignment,
            'background-color': backgroundColor,
        };
    
        return (
            <div id = { uid } className={ 'bokez-notification bokez-notification-' + type + ' dismissible-' + dismissible } style={ style } >
                
                {
                    dismissible && (
                        <span className = {'bokez-notification-close'} >
                        
                            <CloseIcon fill = { textColor } />
        
                        </span>
                    )
                }
    
                <RichText.Content 
                    style = {{ 'color': textColor }}
                    tagName = { 'p' }
                    value = { message }
                />
    
            </div>
        );
    },
})

