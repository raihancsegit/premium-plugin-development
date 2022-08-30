/***********************************************************
 * Icons
***********************************************************/

const Gradient = (props) => (
	<defs>
		<linearGradient {...props} gradientTransform="rotate(90)">
			<stop offset="0%" stopColor="#3F5EFB" stopOpacity="1" />
			<stop offset="100%" stopColor="#FC466B" stopOpacity="1" />
		</linearGradient>
	</defs>
)

let iconNum = 1
const iconID = () => "bokez-icon-" + iconNum++

export const VideoPopupIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />   
            <path fill={ `url(#${id})` } d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>         
        </svg>
    )   
}

export const CoverIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M22 4v16h-20v-16h20zm2-2h-24v20h24v-20zm-5 13.092v-6.184c.581-.207 1-.756 1-1.408 0-.828-.672-1.5-1.5-1.5-.652 0-1.201.419-1.408 1h-10.184c-.207-.581-.756-1-1.408-1-.828 0-1.5.672-1.5 1.5 0 .652.419 1.201 1 1.408v6.184c-.581.207-1 .756-1 1.408 0 .828.672 1.5 1.5 1.5.652 0 1.201-.419 1.408-1h10.184c.207.581.756 1 1.408 1 .828 0 1.5-.672 1.5-1.5 0-.652-.419-1.201-1-1.408zm-1.908.908h-10.184c-.15-.424-.484-.757-.908-.908v-6.184c.424-.151.757-.484.908-.908h10.184c.151.424.484.757.908.908v6.184c-.424.151-.758.484-.908.908zm-9.092-6c0-.552.448-1 1-1s1 .448 1 1-.448 1-1 1-1-.448-1-1zm8 5l-2.75-5-1.891 2.984-1.359-1.312-2 3.328h8z"/>            
        </svg>
    )   
}

export const NotificationIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/>
        </svg>
    )   
}

export const SeparatorHeadingIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M19.271 14.521c.358.74.728 1.803.728 2.818 0 4.658-4 6.661-8.498 6.661-2.183 0-4.483-.472-6.5-1.341v-4.659h2c.227 1.809 1.875 3 4.444 3 2.503 0 4.415-1.046 4.63-3.28.127-1.321-.65-2.451-1.653-3.199h4.849zm-4.583-3.521c-3.124-1.398-6.281-2.75-5.639-5.669.714-3.244 7.265-3.206 7.951.669h1.979v-5.109c-2.028-.604-3.936-.891-5.649-.891-4.927 0-8.252 2.375-8.252 6.454 0 1.899.862 3.554 2.113 4.546h-7.191v2h24v-2h-9.312z"/>
        </svg>
    )   
}

export const QuoteIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z"/>
        </svg>
    )   
}

export const DividerIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-14v-4h14v4z"/>
        </svg>
    )   
}

export const FaqIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/>
        </svg>
    )   
}

export const ButtonIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M24 24h-24v-24h24v24zm-22-22v20h20v-20h-20z"/>
        </svg>
    )   
}

export const ProgressBarIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M0 9v6h24v-6h-24zm22 4h-8v-2h8v2z"/>
        </svg>
    )   
}

export const ShareIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/>
        </svg>
    )   
}

export const FacebookIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
    )   
}

export const TwitterIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
    )   
}

export const GooglePlusIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fill-rule="evenodd" clip-rule="evenodd"/>            
        </svg>
    )   
}

export const RedditIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"/>
        </svg>
    )   
}

export const LinkedinIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
        </svg>
    )   
}

export const EmailIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
        </svg>
    )   
}

export const TestimonialIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M0 2v20h24v-20h-24zm13 15h-10v-.417c-.004-1.112.044-1.747 1.324-2.043 1.403-.324 2.787-.613 2.122-1.841-1.973-3.637-.563-5.699 1.554-5.699 2.077 0 3.521 1.985 1.556 5.699-.647 1.22.688 1.51 2.121 1.841 1.284.297 1.328.936 1.323 2.057v.403zm8 0h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6v-2h6v2z"/>            
        </svg>
    )   
}

export const UploadImageIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path d="M19.5 12c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-18 0l4-5.96 2.48 1.96 2.52-4 1.853 2.964c-1.271 1.303-1.977 3.089-1.827 5.036h-9.026zm10.82 4h-14.82v-18h22v7.501c-.623-.261-1.297-.422-2-.476v-5.025h-18v14h11.502c.312.749.765 1.424 1.318 2zm-9.32-11c-.828 0-1.5-.671-1.5-1.5 0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5z"/>            
        </svg>
    )   
}

export const ProfileIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/>
        </svg>
    )   
}

export const MoveIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M11 6h-4l5-6 5 6h-4v3h-2v-3zm2 9h-2v3h-4l5 6 5-6h-4v-3zm6-4h-14v2h14v-2z"/>
        </svg>
    )   
}

export const PostsGridIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/>
        </svg>
    )   
}

export const DeleteIcon = () => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
        </svg>
    )   
}

export const ArrowLeftIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M20 .753l-14.44 11.247 13.44 11.263-.678.737-14.322-12 15.335-12 .665.753z"/>
        </svg>
    )   
}

export const ArrowRightIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M4 .753l14.44 11.247-13.44 11.263.678.737 14.322-12-15.335-12-.665.753z"/>
        </svg>
    )   
}

export const CloseIcon = ( props ) => {
	return (
        <svg xmlns= { "http://www.w3.org/2000/svg" }  viewBox = { "0 0 24 24" } width = { 12 } height = {12} >
            <path fill = { props.fill } d = { "M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" } />
        </svg>
    )   
}

export const VideoPlayIcon = ( props ) => {
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill = { props.fill } d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
        </svg>
    )   
}

export const PricingTableIcon = () => {
	const id = iconID()
	return (
        <svg className="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <Gradient id={ id } />            
            <path fill={ `url(#${id})` } d="M10.605 0h-10.604v10.609l13.39 13.391 10.609-10.605-13.395-13.395zm-7.019 6.414c-.781-.782-.781-2.047 0-2.828.782-.781 2.048-.781 2.828-.002.782.783.782 2.048 0 2.83-.781.781-2.046.781-2.828 0zm6.823 8.947l-4.243-4.242.708-.708 4.243 4.243-.708.707zm4.949.707l-7.07-7.071.707-.707 7.071 7.071-.708.707zm2.121-2.121l-7.071-7.071.707-.707 7.071 7.071-.707.707z"/>
        </svg>
    )   
}
