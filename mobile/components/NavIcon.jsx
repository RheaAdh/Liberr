import styled from 'styled-components/native';

import book from "./../assets/icons/book.png"
import subscription from "./../assets/icons/subscription.png"
import shelf from "./../assets/icons/shelf.png"
import tracking from "./../assets/icons/tracking.png"
import profile from "./../assets/icons/profile.png"
import bookActive from "./../assets/icons/bookActive.png"
import subActive from "./../assets/icons/subActive.png"
import shelfActive from "./../assets/icons/shelfActive.png"
import trackingActive from "./../assets/icons/trackingActive.png"
import profileActive from "./../assets/icons/profileActive.png"

export default function NavIcon({label, isFocused}) {
	let icon;
	switch(label) {
		case "Books":
			if (isFocused)	icon = bookActive;
			else icon = book;
			break;
		case "Profile":
			if (isFocused)	icon = profileActive;
			else icon = profile;
			break;
		case "Subscription":
			if (isFocused)	icon = subActive;
			else icon = subscription;
			break;
		case "Tracking":
			if (isFocused)	icon = trackingActive;
			else icon = tracking;
			break;
		case "Shelf":
			if (isFocused)	icon = shelfActive;
			else icon = shelf;
			break;
		default:
			icon = null;
	}
    return (
        <img style={{height: isFocused ? '20px' : '15px'}} src={icon}/>
    );
}