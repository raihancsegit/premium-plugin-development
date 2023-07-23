import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    RichText,
} = wp.editor;

const { 
    SelectControl,
    RangeControl,
} = wp.components;

export class Edit extends Component{

    render(){
    
        const { 
            isSelected, 
            setAttributes, 
        } = this.props

        const { 
            textColor, 
            alignment, 
            backgroundColor, 
            borderPosition, 
            borderSize, 
            borderColor,
            quote,
            cite
        } = this.props.attributes

        const style = {
            'text-align': alignment,
            'background-color': backgroundColor,
            'color': textColor,
            [ 'border-' + borderPosition ]: borderSize + 'px solid ' + borderColor,	
        };

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
                            label = { __( 'Border Position' ) }
                            value = { borderPosition }
                            options = { bokez.borderPositions.map( function( pos ) {
                                return { value: pos.value, label: pos.label };
                            })}
                            onChange = { ( newBorderPosition ) => setAttributes( { borderPosition: newBorderPosition } ) }
                    />

                    <RangeControl
                        label = { __( 'Border Size' ) }
                        value = { borderSize }
                        min = { 0 }
                        max = { 15 }
                        step = { 1 }
                        onChange = { ( newBorderSize ) => setAttributes( { borderSize: newBorderSize } ) } 
                    />

                    <PanelColorSettings 
                        title = { __( 'Border Color' ) } 
                        initialOpen = { false } 
                        colorValue = { borderColor }
                        colorSettings={ [ {
                                value: borderColor,
                                colors: bokez.colors,
                                label: __( 'Border Color' ),
                                onChange: ( newColor ) => setAttributes( { borderColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>

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

            <blockquote key={ 'quote' } className={ 'bokez-blockquote' } style={ style } >
                
                <RichText 
                    tagName = { 'p' }
                    placeholder = { quote }
                    keepPlaceholderOnFocus = { true }
                    value = { quote }
                    isSelected = { false }
                    onChange = { ( newQuote ) => setAttributes( { quote: newQuote } ) }
                />

                <RichText 
                    style = {{ 'text-align' : alignment }}
                    tagName = { 'cite' }
                    placeholder = { cite }
                    keepPlaceholderOnFocus = { true }
                    value = { cite }
                    isSelected = { false }
                    onChange = { ( newCite ) => setAttributes( { cite: newCite } ) }
                />

            </blockquote>
            
        ];
    }

}
