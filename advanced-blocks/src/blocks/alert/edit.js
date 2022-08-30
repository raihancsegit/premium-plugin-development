import { bokez } from '../../global';
import { CloseIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    RichText
} = wp.editor;

const { 
    SelectControl,
    ToggleControl,
} = wp.components;

export class Edit extends Component{

    render(){
    
        const { 
            isSelected, 
            setAttributes, 
            attributes
        } = this.props
    
        const { 
            message,
            type,
            backgroundColor,
            textColor,
            dismissible,
            uid,
            alignment
        } = attributes
    
        const style = {
            'text-align': alignment,
            'background-color': backgroundColor,	
        };
    
        if( uid === '' ){
            setAttributes({ uid : bokez.uniqueID() });
        }
        
        return [
    
            isSelected && (
                
                <BlockControls key = { 'controls' }>
                
                    <AlignmentToolbar
                        value={alignment}
                        onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
                    />
                
                </BlockControls>
    
            ),
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
    
                    <SelectControl 
                        label = { __( 'Notification Type' ) }
                        value = { type }
                        options = { bokez.notificationTypes.map( function( pos ) {
                            return { value: pos.value, label: pos.label };
                        })}
                        onChange = { ( newType ) => setAttributes( { type: newType } ) }
                    />
                
                    <ToggleControl
                        label = { __( 'Dismissible' ) }
                        checked = { dismissible }
                        onChange = { ( value ) => setAttributes( { dismissible: value } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { backgroundColor } 
                        colorSettings={ [ {
                                value: backgroundColor,
                                colors: bokez.colors,
                                label: __( 'Background Color' ),
                                onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Text Color' ) } 
                        initialOpen = { false } 
                        colorValue = { textColor } 
                        colorSettings={ [ {
                                value: textColor,
                                colors: bokez.colors,
                                label: __( 'Text Color' ),
                                onChange: ( newColor ) => setAttributes( { textColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key={ 'editable' } id = { uid } className={ 'bokez-notification bokez-notification-' + type + ' dismissible-' + dismissible } style={ style } >
                
                {
                    dismissible && (
                        <span className = {'bokez-notification-close'} >
                        
                            <CloseIcon fill = { textColor } />
        
                        </span>
                    )
                }
    
                <RichText 
                    style = {{ 'color': textColor }}
                    key = { 'editable-p' }
                    tagName = { 'p' }
                    placeholder = { message.default }
                    keepPlaceholderOnFocus = { true }
                    value = { message }
                    onChange = { ( newMessage ) => setAttributes( { message: newMessage } ) }
                />
    
            </div>
            
        ];
    }

}
