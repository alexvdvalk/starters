import { browser } from '$app/environment';
import { setAttr as basesetAttr } from '@directus/visual-editing';
import { getSiteData } from '../../routes/siteData.remote';

interface ApplyOptions {
	collection: string;
	item: string | number;
	fields?: string | string[];
	mode?: 'modal' | 'popover' | 'drawer';
}

export const setAttr = (options: ApplyOptions) => {
	if (browser && sessionStorage.getItem('visual-editing') === 'true') {
		return basesetAttr({
			...options
		});
	}
};

export const enableVisualEditing = async () => {
	const siteData = await getSiteData();
	const visualEditingEnabled = siteData?.visualEditingEnabled;
	if (browser && visualEditingEnabled) {
		sessionStorage.setItem('visual-editing', 'true');
	}
};

export default setAttr;
