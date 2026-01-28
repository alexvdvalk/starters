
export interface ExtensionSeoMetadata {
    title?: string;
    meta_description?: string;
    og_image?: string;
    additional_fields?: Record<string, unknown>;
    sitemap?: {
        change_frequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: string;
    };
    no_index?: boolean;
    no_follow?: boolean;
}

export interface AiImage {
	/** @primaryKey */
	id: string;
	image?: DirectusFile | string | null;
}

export interface AiPrompt {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @description Unique name for the prompt. Use names like "create-article" or "generate-product-description". @required */
	name: string;
	/** @description Is this prompt published and available to use? */
	status?: 'draft' | 'in_review' | 'published';
	/** @description Briefly explain what this prompt does in 1-2 sentences. */
	description?: string | null;
	/** @description Optional: Define the conversation structure between users and AI. Used to add context and improve outputs. */
	messages?: Array<{ role: 'user' | 'assistant'; text: string }> | null;
	/** @description Instructions that shape how the AI responds. */
	system_prompt?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface Aircraft {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	model?: string | null;
	/** @description e.g., fighter, transport */
	role?: string | null;
	manufacturer?: string | null;
	operator?: Country | string | null;
	max_speed_kmh?: number | null;
	range_km?: number | null;
	crew?: number | null;
	introduced?: string | null;
	/** @description operational, reserve, retired */
	service_status?: string | null;
	country?: Country | string | null;
	image?: DirectusFile | string | null;
}

export interface Announcement {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	title?: string | null;
	cover_image?: DirectusFile | string | null;
	specifications?: string | null;
	banana?: DirectusFile | string | null;
	other_images?: AnnouncementsFile[] | string[];
}

export interface AnnouncementsFile {
	/** @primaryKey */
	id: number;
	announcements_id?: Announcement | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface Area {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
}

export interface Attraction {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	/** @required */
	title: string;
	description?: string | null;
	location?: string | null;
}

export interface BlockButton {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @description What type of link is this? Page and Post allow you to link to internal content. URL is for external content. Group can contain other menu items. */
	type?: 'page' | 'post' | 'url' | null;
	/** @description The internal page to link to. */
	page?: Page | string | null;
	/** @description The internal post to link to. */
	post?: Post | string | null;
	/** @description Text to include on the button. */
	label?: string | null;
	/** @description What type of button */
	variant?: 'default' | 'outline' | 'soft' | 'ghost' | 'link' | null;
	/** @description The id of the Button Group this button belongs to. */
	button_group?: BlockButtonGroup | string | null;
	/** @description The URL to link to. Could be relative (ie `/my-page`) or a full external URL (ie `https://docs.directus.io`) */
	url?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BlockButtonGroup {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Add individual buttons to the button group. */
	buttons?: BlockButton[] | string[];
}

export interface BlockForm {
	/** @primaryKey */
	id: string;
	/** @description Form to show within block */
	form?: Form | string | null;
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BlockGallery {
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Images to include in the image gallery. */
	items?: BlockGalleryItem[] | string[];
}

export interface BlockGalleryItem {
	/** @primaryKey */
	id: string;
	/** @description The id of the gallery block this item belongs to. */
	block_gallery?: BlockGallery | string | null;
	/** @description The id of the file included in the gallery. */
	directus_file?: DirectusFile | string | null;
	sort?: number | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BlockHero {
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Featured image in the hero. */
	image?: DirectusFile | string | null;
	/** @description Action buttons that show below headline and description. */
	button_group?: BlockButtonGroup | string | null;
	/** @description Supporting copy that shows below the headline. */
	description?: string | null;
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	/** @description The layout for the component. You can set the image to display left, right, or in the center of page.. */
	layout?: 'image_left' | 'image_center' | 'image_right' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	alt_text?: string | null;
	custom_css?: string | null;
	colour?: string | null;
	show_on_mobile?: boolean | null;
}

export interface BlockPost {
	/** @primaryKey */
	id: string;
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @description The collection of content to fetch and display on the page within this block. @required */
	collection: 'posts';
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	limit?: number | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BlockPricing {
	/** @primaryKey */
	id: string;
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description The individual pricing cards to display. */
	pricing_cards?: BlockPricingCard[] | string[];
}

export interface BlockPricingCard {
	/** @primaryKey */
	id: string;
	/** @description Name of the pricing plan. Shown at the top of the card. */
	title?: string | null;
	/** @description Short, one sentence description of the pricing plan and who it is for. */
	description?: string | null;
	/** @description Price and term for the pricing plan. (ie `$199/mo`) */
	price?: string | null;
	/** @description Badge that displays at the top of the pricing plan card to add helpful context. */
	badge?: string | null;
	/** @description Short list of features included in this plan. Press `Enter` to add another item to the list. */
	features?: 'json' | null;
	/** @description The action button / link shown at the bottom of the pricing card. */
	button?: BlockButton | string | null;
	/** @description The id of the pricing block this card belongs to. */
	pricing?: BlockPricing | string | null;
	/** @description Add highlighted border around the pricing plan to make it stand out. */
	is_highlighted?: boolean | null;
	sort?: number | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BlockRichtext {
	/** @description Rich text content for this block. */
	content?: string | null;
	/** @description Larger main headline for this page section. */
	headline?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Controls how the content block is positioned on the page. Choose "Left" to align the block against the left margin or "Center" to position the block in the middle of the page. This setting affects the entire content block's placement, not the text alignment within it. */
	alignment?: 'left' | 'center' | null;
	/** @description Smaller copy shown above the headline to label a section or add extra context. */
	tagline?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface BrandKeyStat {
	/** @primaryKey */
	id: number;
	title?: string | null;
	content?: string | null;
	brand?: Brand | string | null;
	sort?: number | null;
}

export interface Brand {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	/** @description The brand's name as it will be seen on the website */
	name?: string | null;
	logo?: DirectusFile | string | null;
	url_slug?: string | null;
	cover_image?: DirectusFile | string | null;
	description_title?: string | null;
	description_content?: string | null;
	key_stats?: BrandKeyStat[] | string[];
}

export interface Category {
	/** @primaryKey */
	id: string;
	name?: string | null;
	sort?: number | null;
	title?: string | null;
	parent_category?: Category | string | null;
	is_active?: boolean;
	sub_categories?: Category[] | string[];
}

export interface CategoriesEi {
	/** @primaryKey */
	id: string;
	name?: string | null;
}

export interface City {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
	summary?: string | null;
	overview_images?: CitiesFile[] | string[];
}

export interface CitiesFile {
	/** @primaryKey */
	id: number;
	cities_id?: City | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface Community {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	title?: string | null;
	/** @description Subtitle which is under the title */
	location?: string | null;
	icon?: DirectusFile | string | null;
	geo_location?: string | null;
	status?: 'now_selling' | 'coming_soon' | null;
	for_retirement?: boolean | null;
	slug?: string | null;
	properties?: Property[] | string[];
}

export interface Continent {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	/** @description Short code (e.g., EU, AS) */
	code?: string | null;
}

export interface ContractPartner {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
	parent?: ContractPartner | string | null;
	code?: number | null;
	sort?: number | null;
	second_parent?: ContractPartner | string | null;
	status?: 'draft' | 'approved' | null;
	children?: ContractPartner[] | string[];
	second_child?: ContractPartner[] | string[];
}

export interface CookieConsent {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	essential_cookies?: boolean | null;
	analytics_cookies?: boolean | null;
	marketing_cookies?: boolean | null;
	ip_address?: string | null;
	user_agent?: string | null;
	/** @description When last the user with this cookie accessed the site */
	last_seen?: string | null;
	money?: number | null;
}

export interface Country {
	/** @primaryKey */
	id: number;
	name?: string | null;
	parent?: Country | string | null;
	children?: Country[] | string[];
}

export interface Country {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	/** @description ISO Alpha-2 or Alpha-3 */
	iso_code?: string | null;
	continent?: Continent | string | null;
	map?: string | null;
	aircraft?: Aircraft[] | string[];
	drones?: Drone[] | string[];
	submarines?: Submarine[] | string[];
	ships?: Ship[] | string[];
}

export interface Course {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	title?: string | null;
	faculty?: Faculty | string | null;
	students?: StudentsCourse[] | string[];
}

export interface Customer {
	/** @primaryKey */
	id: string;
	name?: string | null;
	email?: string | null;
	interested_communities?: CustomerCommunity[] | string[];
}

export interface CustomerAddresse {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	customer?: Customer | string | null;
	address_line_1?: string | null;
	address_line_2?: string | null;
	city?: string | null;
	state?: string | null;
	postal_code?: string | null;
	country_code?: string | null;
	is_shipping?: boolean;
	is_billing?: boolean;
	is_active?: boolean;
}

export interface CustomerCommunity {
	/** @primaryKey */
	id: number;
	customer_id?: Customer | string | null;
	communities_id?: Community | string | null;
}

export interface CustomerProfile {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
	status?: 'active' | null;
}

export interface Customer {
	/** @description Unique identifier for customer @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	email?: string;
	phone?: string | null;
	password?: string | null;
	/** @description Is customer subscribed to marketing emails? */
	is_subscribed?: boolean | null;
	addresses?: CustomerAddresse[] | string[];
	orders?: Order[] | string[];
}

export interface DirectusSyncIdMap {
	/** @primaryKey */
	id: number;
	table?: string;
	sync_id?: string;
	local_id?: string;
	created_at?: string | null;
}

export interface Drone {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	model?: string | null;
	/** @description e.g., ISR, UCAV */
	role?: string | null;
	manufacturer?: string | null;
	operator?: Country | string | null;
	max_speed_kmh?: number | null;
	range_km?: number | null;
	endurance_hours?: number | null;
	ceiling_m?: number | null;
	introduced?: string | null;
	/** @description operational, reserve, retired */
	service_status?: string | null;
	image?: DirectusFile | string | null;
	country?: Country | string | null;
}

export interface Event {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	title?: string | null;
	date_from?: string | null;
	date_to?: string | null;
	location?: string | null;
}

export interface Faculty {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
}

export interface Faq {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	question?: string | null;
	answer?: string | null;
	published?: boolean | null;
	section?: FaqSection | string | null;
}

export interface FaqSection {
	/** @primaryKey */
	id: string;
	title?: string | null;
	faqs?: Faq[] | string[];
}

export interface FeedNewsItem {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	image?: DirectusFile | string | null;
	content?: string | null;
	summary?: string | null;
	published?: boolean | null;
	sort?: number | null;
	geo?: string | null;
	comments?: NewsItemComment[] | string[];
}

export interface FormField {
	/** @primaryKey */
	id: string;
	/** @description Unique field identifier, not shown to users (lowercase, hyphenated) */
	name?: string | null;
	/** @description Input type for the field */
	type?: 'text' | 'textarea' | 'checkbox' | 'checkbox_group' | 'radio' | 'file' | 'select' | 'hidden' | null;
	/** @description Text label shown to form users. */
	label?: string | null;
	/** @description Default text shown in empty input. */
	placeholder?: string | null;
	/** @description Additional instructions shown below the input */
	help?: string | null;
	/** @description Available rules: `email`, `url`, `min:5`, `max:20`, `length:10`. Combine with pipes example: `email|max:255` */
	validation?: string | null;
	/** @description Field width on the form */
	width?: '100' | '67' | '50' | '33' | null;
	/** @description Options for radio or select inputs */
	choices?: Array<{ text: string; value: string }> | null;
	/** @description Parent form this field belongs to. */
	form?: Form | string | null;
	sort?: number | null;
	/** @description Make this field mandatory to complete. */
	required?: boolean | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface Form {
	/** @primaryKey */
	id: string;
	/** @description Action after successful submission. */
	on_success?: 'redirect' | 'message' | null;
	sort?: number | null;
	/** @description Text shown on submit button. */
	submit_label?: string | null;
	/** @description Message shown after successful submission. */
	success_message?: string | null;
	/** @description Form name (for internal reference). */
	title?: string | null;
	/** @description Destination URL after successful submission. */
	success_redirect_url?: string | null;
	/** @description Show or hide this form from the site. */
	is_active?: boolean | null;
	/** @description Setup email notifications when forms are submitted. */
	emails?: Array<{ to: string[]; subject: string; message: string }> | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Form structure and input fields */
	fields?: FormField[] | string[];
	/** @description Received form responses. */
	submissions?: FormSubmission[] | string[];
}

export interface FormSubmission {
	/** @description Unique ID for this specific form submission @primaryKey */
	id: string;
	/** @description Form submission date and time. */
	timestamp?: string | null;
	/** @description Associated form for this submission. */
	form?: Form | string | null;
	/** @description Submitted field responses */
	values?: FormSubmissionValue[] | string[];
}

export interface FormSubmissionValue {
	/** @primaryKey */
	id: string;
	/** @description Parent form submission for this value. */
	form_submission?: FormSubmission | string | null;
	field?: FormField | string | null;
	/** @description The data entered by the user for this specific field in the form submission. */
	value?: string | null;
	sort?: number | null;
	file?: DirectusFile | string | null;
	/** @description Form submission date and time. */
	timestamp?: string | null;
}

export interface Globals {
	/** @description Site summary for search results. */
	description?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Social media profile URLs */
	social_links?: Array<{ url: string; service: 'facebook' | 'instagram' | 'linkedin' | 'x' | 'vimeo' | 'youtube' | 'github' | 'discord' | 'docker' }> | null;
	/** @description Short phrase describing the site. */
	tagline?: string | null;
	/** @description Main site title */
	title?: string | null;
	/** @description Public URL for the website */
	url?: string | null;
	/** @description Small icon for browser tabs. 1:1 ratio. No larger than 512px × 512px. */
	favicon?: DirectusFile | string | null;
	/** @description Main logo shown on the site (for light mode). */
	logo?: DirectusFile | string | null;
	/** @description Secret OpenAI API key. Don't share with anyone outside your team. */
	openai_api_key?: string | null;
	/** @description The public URL for this Directus instance. Used in Flows. */
	directus_url?: string | null;
	/** @description Main logo shown on the site (for dark mode). */
	logo_dark_mode?: DirectusFile | string | null;
	/** @description Accent color for the website (used on buttons, links, etc). */
	accent_color?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	autocomplete_domain?: string | null;
	Autocomplete?: string | null;
}

export interface Kudo {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	badge?: string | null;
	message?: string | null;
	from_user?: DirectusUser | string | null;
	to_user?: DirectusUser | string | null;
}

export interface Language {
	/** @primaryKey */
	code: string;
	name?: string | null;
	direction?: 'ltr' | 'rtl' | null;
	slug?: string | null;
}

export interface LogitechProduct {
	/** @primaryKey */
	id: string;
	/** @description Product name @required */
	name: string;
	/** @description URL-friendly identifier (translatable) */
	slug?: string | null;
	/** @description Product type/category */
	product_type?: LogitechProductType | string | null;
	/** @description Main product cover image */
	cover_image?: DirectusFile | string | null;
	/** @description Link to help documentation */
	help_documentation_url?: string | null;
	/** @description Link to drivers download page */
	drivers_url?: string | null;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	user_created?: string | null;
	date_created?: string | null;
	user_updated?: string | null;
	date_updated?: string | null;
	/** @description Retailers that sell this product */
	retailers?: LogitechProductsRetailer[] | string[];
	/** @description Product gallery images */
	gallery?: LogitechProductsGallery[] | string[];
	/** @description Product translations for description and slug */
	translations?: LogitechProductsTranslation[] | null;
}

export interface LogitechProductsGallery {
	/** @primaryKey */
	id: string;
	logitech_products_id?: LogitechProduct | string | null;
	directus_files_id?: DirectusFile | string | null;
	sort?: number | null;
}

export interface LogitechProductsRetailer {
	/** @primaryKey */
	id: string;
	logitech_products_id?: LogitechProduct | string | null;
	logitech_retailers_id?: LogitechRetailer | string | null;
	sort?: number | null;
}

export interface LogitechProductsTranslation {
	/** @primaryKey */
	id: string;
	logitech_products_id?: LogitechProduct | string | null;
	languages_code?: Language | string | null;
	/** @description Translated product description */
	description?: string | null;
	/** @description Translated URL-friendly identifier */
	slug?: string | null;
}

export interface LogitechProductType {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	/** @description URL-friendly identifier */
	slug?: string | null;
	description?: string | null;
	sort?: number | null;
	user_created?: string | null;
	date_created?: string | null;
	user_updated?: string | null;
	date_updated?: string | null;
}

export interface LogitechRetailer {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	/** @description Retailer website URL */
	website?: string | null;
	/** @description Retailer logo */
	logo?: DirectusFile | string | null;
	sort?: number | null;
	user_created?: string | null;
	date_created?: string | null;
	user_updated?: string | null;
	date_updated?: string | null;
}

export interface LookupRelation {
	/** @primaryKey */
	id: number;
	autocomplete?: string | null;
	sort?: number | null;
}

export interface Machine {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	/** @description Machine name or identifier @required */
	name: string;
	machine_type?: MachineType | string | null;
	manufacturer?: string | null;
	model?: string | null;
	serial_number?: string | null;
	site?: Site | string | null;
	area?: Area | string | null;
	status?: 'operational' | 'maintenance' | 'offline' | 'decommissioned' | null;
	installation_date?: string | null;
	warranty_expiry?: string | null;
	/** @description Power rating in kilowatts */
	power_rating_kw?: number | null;
	/** @description Operating voltage (V) */
	voltage?: number | null;
	/** @description Current rating (A) */
	current_rating?: number | null;
	/** @description Frequency (Hz) */
	frequency?: number | null;
	/** @description For generators */
	fuel_type?: 'diesel' | 'gasoline' | 'natural_gas' | 'propane' | 'biodiesel' | 'na' | null;
	/** @description Fuel tank capacity in liters (for generators) */
	fuel_capacity_liters?: number | null;
	/** @description Engine model (for generators) */
	engine_model?: string | null;
	/** @description Total engine operating hours (for generators) */
	engine_hours?: number | null;
	/** @description Number of solar panels */
	panel_count?: number | null;
	/** @description Individual panel capacity in watts */
	panel_capacity_w?: number | null;
	/** @description Inverter model (for solar systems) */
	inverter_model?: string | null;
	/** @description Battery capacity in kilowatt-hours */
	battery_capacity_kwh?: number | null;
	/** @description Battery chemistry type */
	battery_type?: 'lithium_ion' | 'lead_acid' | 'nickel_cadmium' | 'flow_battery' | 'other' | null;
	/** @description Battery nominal voltage (V) */
	battery_voltage?: number | null;
	notes?: string | null;
	maintenance_records?: MaintenanceRecord[] | string[];
	telemetry?: MachineTelemetry[] | string[];
}

export interface MachineTelemetry {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	machine?: Machine | string | null;
	/** @required */
	timestamp: string;
	/** @description Current power output in kilowatts */
	power_output_kw?: number | null;
	/** @description Current power input in kilowatts (for batteries/charging) */
	power_input_kw?: number | null;
	/** @description Measured voltage (V) */
	voltage?: number | null;
	/** @description Measured current (A) */
	current?: number | null;
	/** @description Frequency (Hz) */
	frequency?: number | null;
	/** @description Temperature in Celsius */
	temperature?: number | null;
	/** @description Fuel tank level percentage (0-100) for generators */
	fuel_level_percent?: number | null;
	/** @description Battery state of charge percentage (0-100) */
	battery_state_of_charge?: number | null;
	/** @description Battery voltage (V) */
	battery_voltage?: number | null;
	/** @description Solar irradiance in W/m² */
	solar_irradiance?: number | null;
	/** @description Cumulative runtime hours (for generators) */
	runtime_hours?: number | null;
	operational_status?: 'running' | 'idle' | 'charging' | 'discharging' | 'standby' | 'fault' | 'offline' | null;
	/** @description JSON array of active alarms/warnings */
	alarms?: Record<string, any> | null;
}

export interface MachineType {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	description?: string | null;
	category?: 'generator' | 'solar' | 'battery' | 'inverter' | 'other' | null;
}

export interface MaintenanceRecord {
	/** @primaryKey */
	id: string;
	/** @required */
	machine: Machine | string;
	maintenance_type?: 'routine' | 'preventive' | 'corrective' | 'emergency' | 'inspection' | null;
	/** @required */
	maintenance_date: string;
	technician?: string | null;
	description?: string | null;
	/** @description List of parts replaced during maintenance */
	parts_replaced?: string | null;
	/** @description Maintenance cost */
	cost?: number | null;
	/** @description Scheduled next maintenance date */
	next_maintenance_date?: string | null;
	status?: 'completed' | 'scheduled' | 'in_progress' | 'cancelled' | null;
}

export interface Navigation {
	/** @description Unique identifier for this menu. Can't be edited after creation. @primaryKey */
	id: string;
	/** @description What is the name of this menu? Only used internally. */
	title?: string | null;
	/** @description Show or hide this menu from the site. */
	is_active?: boolean | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Links within the menu. */
	items?: NavigationItem[] | string[];
}

export interface NavigationItem {
	/** @primaryKey */
	id: string;
	/** @description Navigation menu that the individual links belong to. */
	navigation?: Navigation | string | null;
	/** @description The internal page to link to. */
	page?: Page | string | null;
	/** @description The parent navigation item. */
	parent?: NavigationItem | string | null;
	sort?: number | null;
	/** @description Label shown to the user for the menu item. @required */
	title: string;
	/** @description What type of link is this? Page and Post allow you to link to internal content. URL is for external content. Group can contain other menu items. */
	type?: 'page' | 'post' | 'url' | 'group' | null;
	/** @description The URL to link to. Could be relative (ie `/my-page`) or a full external URL (ie `https://docs.directus.io`) */
	url?: string | null;
	/** @description The internal post to link to. */
	post?: Post | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	/** @description Add child menu items within the group. */
	children?: NavigationItem[] | string[];
}

export interface NewsItemComment {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	comments?: string | null;
	news_item?: FeedNewsItem | string | null;
}

export interface OrderItem {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	quantity?: number | null;
	product?: Product | string | null;
	subtotal?: number | null;
	total?: number | null;
	order?: Order | string | null;
	price?: number | null;
	product_variant?: ProductVariant | string | null;
}

export interface Order {
	/** @primaryKey */
	id: string;
	status?: 'pending' | 'completed' | 'archived' | 'canceled';
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	customer?: Customer | string | null;
	fulfillment_status?: 'open' | 'in_progress' | 'fulfilled' | 'on_hold' | null;
	payment_status?: 'not_paid' | 'awaiting' | 'paid' | 'refunded' | null;
	billing_address?: CustomerAddresse | string | null;
	shipping_address?: CustomerAddresse | string | null;
	completed_at?: string | null;
	canceled_at?: string | null;
	order_number?: string | null;
	/** @description Subtotal for entire order before taxes and shipping */
	subtotal?: number | null;
	/** @description Total amount for the entire order */
	total?: number | null;
	/** @description Tax amount owed for entire order */
	tax_total?: number | null;
	/** @description Shipping amount owed for entire order */
	shipping_total?: number | null;
	line_items?: OrderItem[] | string[];
}

export interface PageBlock {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @description The id of the page that this block belongs to. */
	page?: Page | string | null;
	/** @description The data for the block. */
	item?: BlockHero | BlockRichtext | BlockForm | BlockPost | BlockGallery | BlockPricing | string | null;
	/** @description The collection (type of block). */
	collection?: string | null;
	/** @description Temporarily hide this block on the website without having to remove it from your page. */
	hide_block?: boolean | null;
	/** @description Background color for the block to create contrast. Does not control dark or light mode for the entire site. */
	background?: 'light' | 'dark' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface Page {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @description The title of this page. @required */
	title: string;
	/** @description Unique URL for this page (start with `/`, can have multiple segments `/about/me`)). @required */
	permalink: string;
	/** @description Is this page published? */
	status?: 'draft' | 'in_review' | 'published';
	/** @description Publish now or schedule for later. */
	published_at?: string | null;
	seo?: ExtensionSeoMetadata | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	legacy?: Record<string, any> | null;
	site?: Site | string | null;
	/** @description Create and arrange different content blocks (like text, images, or videos) to build your page. */
	blocks?: PageBlock[] | string[];
}

export interface Post {
	/** @description Rich text content of your blog post. */
	content?: string | null;
	/** @primaryKey */
	id: string;
	/** @description Featured image for this post. Used in cards linking to the post and in the post detail page. */
	image?: DirectusFile | string | null;
	/** @description Unique URL for this post (e.g., `yoursite.com/posts/{{your-slug}}`) */
	slug?: string | null;
	sort?: number | null;
	/** @description Is this post published? */
	status?: 'draft' | 'in_review' | 'published';
	/** @description Title of the blog post (used in page title and meta tags) @required */
	title: string;
	/** @description Short summary of the blog post to entice readers. */
	description?: string | null;
	/** @description Select the team member who wrote this post */
	author?: DirectusUser | string | null;
	/** @description Publish now or schedule for later. */
	published_at?: string | null;
	seo?: ExtensionSeoMetadata | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
	post_icon?: string | null;
	site?: Site | string | null;
	md_content?: string | null;
	related_posts?: PostsPost[] | string[];
	translations?: PostsTranslation[] | null;
	categories?: PostWebsiteCategory[] | string[];
}

export interface PostsPost {
	/** @primaryKey */
	id: number;
	posts_id?: Post | string | null;
	related_posts_id?: Post | string | null;
}

export interface PostsTranslation {
	/** @primaryKey */
	id: number;
	posts_id?: Post | string | null;
	languages_code?: Language | string | null;
	/** @required */
	title: string;
	content?: string | null;
	slug?: string | null;
}

export interface PostWebsiteCategory {
	/** @primaryKey */
	id: string;
	website?: Site | string | null;
	post?: Post | string | null;
	categories?: PostWebsiteCategoryCategoriesEi[] | string[];
}

export interface PostWebsiteCategoryCategoriesEi {
	/** @primaryKey */
	id: number;
	post_website_category_id?: PostWebsiteCategory | string | null;
	categories_eis_id?: CategoriesEi | string | null;
}

export interface ProductAttributeKey {
	/** @primaryKey */
	key: string;
	label?: string | null;
	units?: string | null;
}

export interface ProductAttribute {
	/** @primaryKey */
	id: string;
	product?: Product | string | null;
	value?: string | null;
	key?: ProductAttributeKey | string | null;
}

export interface ProductImage {
	/** @primaryKey */
	id: string;
	product?: Product | string | null;
	file?: DirectusFile | string | null;
	sort?: number | null;
}

export interface Product {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
	/** @description Enter a valid SAP code */
	SAP_code?: string | null;
	/** @description Unique URL for this product */
	slug?: string | null;
	description?: string | null;
	status?: 'draft' | 'published' | null;
	require_prescription?: boolean | null;
	sort?: number | null;
	/** @description Name of this product */
	title?: string | null;
	/** @description Main thumbnail used for this product */
	thumbnail?: DirectusFile | string | null;
	/** @description What colors are available? */
	color?: 'gray' | null;
	/** @description What sizes are available? */
	size?: 'gray' | null;
	category?: Category | string | null;
	publish__date?: string | null;
	gallery?: ProductsFile[] | string[];
	categories?: ProductsCategory[] | string[];
	documents?: ProductsFiles1[] | string[];
	attributes?: ProductAttribute[] | string[];
	/** @description Gallery of images featured on the product page */
	images?: ProductImage[] | string[];
	variants?: ProductVariant[] | string[];
}

export interface ProductsCategory {
	/** @primaryKey */
	id: number;
	products_id?: Product | string | null;
	categories_id?: Category | string | null;
}

export interface ProductsFile {
	/** @primaryKey */
	id: number;
	products_id?: Product | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface ProductsFiles1 {
	/** @primaryKey */
	id: number;
	products_id?: Product | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface ProductVariant {
	/** @primaryKey */
	id: string;
	product?: Product | string | null;
	price?: number | null;
	sku?: string | null;
	image?: DirectusFile | string | null;
	color?: string | null;
	size?: string | null;
	weight?: number | null;
	weight_unit?: 'g' | 'kg' | 'lb' | 'oz' | null;
}

export interface Property {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	price?: number | null;
	title?: string | null;
	community?: Community | string | null;
	delivery_date?: string | null;
	bedrooms?: number | null;
	bathrooms?: number | null;
	type?: 'townhome' | 'house' | 'apartment' | null;
	sq_ft?: number | null;
	parking?: string | null;
	interior_finishes?: string | null;
	structual_features?: string | null;
	energy_efficient_living?: string | null;
	slug?: string | null;
	address?: PropertyAddresse | string | null;
	images?: PropertiesFile[] | string[];
}

export interface PropertiesFile {
	/** @primaryKey */
	id: number;
	properties_id?: Property | string | null;
	directus_files_id?: DirectusFile | string | null;
	sort?: number | null;
}

export interface PropertyAddresse {
	/** @primaryKey */
	id: string;
	/** @required */
	street1: string;
	street2?: string | null;
	/** @required */
	city: string;
	state?: string | null;
	/** @required */
	postal_code: string;
	/** @required */
	country: string;
}

export interface Redirect {
	/** @primaryKey */
	id: string;
	response_code?: '301' | '302' | null;
	/** @description Old URL has to be relative to the site (ie `/blog` or `/news`). It cannot be a full url like (https://example.com/blog) */
	url_from?: string | null;
	/** @description The URL you're redirecting to. This can be a relative url (/resources/matt-is-cool) or a full url (https://example.com/blog). */
	url_to?: string | null;
	/** @description Short explanation of why the redirect was created. */
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	date_updated?: string | null;
	user_updated?: DirectusUser | string | null;
}

export interface RefundRequest {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	customer_id?: string | null;
	request_date?: string | null;
	details?: string | null;
	status?: 'pending' | 'approved' | null;
	/** @description Max £250 */
	amount?: number | null;
	customer?: Customer | string | null;
}

export interface Rental {
	/** @primaryKey */
	id: string;
	/** @required */
	property: Property | string;
	/** @required */
	start_date: string;
	end_date?: string | null;
	/** @required */
	rent_amount: number;
	/** @required */
	payment_frequency: 'monthly' | 'weekly' | 'yearly';
	terms?: string | null;
	date?: string | null;
}

export interface SheduledVersion {
	/** @primaryKey */
	id: string;
}

export interface Ship {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	class?: string | null;
	/** @description e.g., destroyer, frigate */
	type?: string | null;
	operator?: Country | string | null;
	displacement_tons?: number | null;
	crew?: number | null;
	commissioned?: string | null;
	/** @description operational, reserve, decommissioned */
	service_status?: string | null;
	country?: Country | string | null;
	image?: DirectusFile | string | null;
}

export interface SiteASpecific {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
}

export interface Site {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	title?: string | null;
	url?: string | null;
	crm_lookup?: string | null;
	pages?: Page[] | string[];
	posts?: Post[] | string[];
	site_managers?: SitesDirectusUser[] | string[];
}

export interface SitesDirectusUser {
	/** @primaryKey */
	id: number;
	sites_id?: Site | string | null;
	directus_users_id?: DirectusUser | string | null;
}

export interface Student {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	firstName?: string | null;
	lastName?: string | null;
	status?: 'prospective' | 'current' | 'alumni' | null;
	email?: string | null;
	phone_number?: string | null;
	courses?: StudentsCourse[] | string[];
}

export interface StudentsCourse {
	/** @primaryKey */
	id: number;
	students_id?: Student | string | null;
	courses_id?: Course | string | null;
	enrollment_date?: string | null;
}

export interface Submarine {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	class?: string | null;
	/** @description e.g., nuclear, diesel-electric */
	type?: string | null;
	operator?: Country | string | null;
	displacement_tons?: number | null;
	max_depth_meters?: number | null;
	crew?: number | null;
	commissioned?: string | null;
	/** @description operational, reserve, decommissioned */
	service_status?: string | null;
	country?: Country | string | null;
	image?: DirectusFile | string | null;
	location?: string | null;
	image_gallery?: SubmarinesFile[] | string[];
}

export interface SubmarinesFile {
	/** @primaryKey */
	id: number;
	submarines_id?: Submarine | string | null;
	directus_files_id?: DirectusFile | string | null;
}

export interface TaxRate {
	/** @primaryKey */
	id: string;
	title?: string | null;
	rate?: number | null;
	code?: string | null;
}

export interface WebsiteLogin {
	/** @primaryKey */
	id: string;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	user?: WebsiteUser | string | null;
	url?: string | null;
}

export interface WebsiteUser {
	/** @primaryKey */
	id: string;
	date_created?: string | null;
	date_updated?: string | null;
	directus_user?: DirectusUser | string | null;
	membership_type?: 'landlord' | 'business' | null;
	signup_date?: string | null;
	cancellation_date?: string | null;
	login_history?: WebsiteLogin[] | string[];
}

export interface DirectusAccess {
	/** @primaryKey */
	id: string;
	role?: DirectusRole | string | null;
	user?: DirectusUser | string | null;
	policy?: DirectusPolicy | string;
	sort?: number | null;
}

export interface DirectusActivity {
	/** @primaryKey */
	id: number;
	action?: string;
	user?: DirectusUser | string | null;
	timestamp?: string;
	ip?: string | null;
	user_agent?: string | null;
	collection?: string;
	item?: string;
	origin?: string | null;
	revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
	/** @primaryKey */
	collection: string;
	icon?: string | null;
	note?: string | null;
	display_template?: string | null;
	hidden?: boolean;
	singleton?: boolean;
	translations?: Array<{ language: string; translation: string; singular: string; plural: string }> | null;
	archive_field?: string | null;
	archive_app_filter?: boolean;
	archive_value?: string | null;
	unarchive_value?: string | null;
	sort_field?: string | null;
	accountability?: 'all' | 'activity' | null | null;
	color?: string | null;
	item_duplication_fields?: 'json' | null;
	sort?: number | null;
	group?: DirectusCollection | string | null;
	collapse?: string;
	preview_url?: string | null;
	versioning?: boolean;
}

export interface DirectusComment {
	/** @primaryKey */
	id: string;
	collection?: DirectusCollection | string;
	item?: string;
	comment?: string;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusField {
	/** @primaryKey */
	id: number;
	collection?: DirectusCollection | string;
	field?: string;
	special?: string[] | null;
	interface?: string | null;
	options?: 'json' | null;
	display?: string | null;
	display_options?: 'json' | null;
	readonly?: boolean;
	hidden?: boolean;
	sort?: number | null;
	width?: string | null;
	translations?: 'json' | null;
	note?: string | null;
	conditions?: 'json' | null;
	required?: boolean | null;
	group?: DirectusField | string | null;
	validation?: 'json' | null;
	validation_message?: string | null;
	searchable?: boolean;
}

export interface DirectusFile {
	/** @primaryKey */
	id: string;
	storage?: string;
	filename_disk?: string | null;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
	folder?: DirectusFolder | string | null;
	uploaded_by?: DirectusUser | string | null;
	created_on?: string;
	modified_by?: DirectusUser | string | null;
	modified_on?: string;
	charset?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
	embed?: string | null;
	description?: string | null;
	location?: string | null;
	tags?: string[] | null;
	metadata?: 'json' | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	tus_id?: string | null;
	tus_data?: 'json' | null;
	uploaded_on?: string | null;
	category?: 'a' | 'b' | null;
	slug?: string | null;
}

export interface DirectusFolder {
	/** @primaryKey */
	id: string;
	name?: string;
	parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
	/** @primaryKey */
	version: string;
	name?: string;
	timestamp?: string | null;
}

export interface DirectusPermission {
	/** @primaryKey */
	id: number;
	collection?: string;
	action?: string;
	permissions?: 'json' | null;
	validation?: 'json' | null;
	presets?: 'json' | null;
	fields?: string[] | null;
	policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	ip_access?: string[] | null;
	enforce_tfa?: boolean;
	admin_access?: boolean;
	app_access?: boolean;
	permissions?: DirectusPermission[] | string[];
	users?: DirectusAccess[] | string[];
	roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
	/** @primaryKey */
	id: number;
	bookmark?: string | null;
	user?: DirectusUser | string | null;
	role?: DirectusRole | string | null;
	collection?: string | null;
	search?: string | null;
	layout?: string | null;
	layout_query?: 'json' | null;
	layout_options?: 'json' | null;
	refresh_interval?: number | null;
	filter?: 'json' | null;
	icon?: string | null;
	color?: string | null;
}

export interface DirectusRelation {
	/** @primaryKey */
	id: number;
	many_collection?: string;
	many_field?: string;
	one_collection?: string | null;
	one_field?: string | null;
	one_collection_field?: string | null;
	one_allowed_collections?: string[] | null;
	junction_field?: string | null;
	sort_field?: string | null;
	one_deselect_action?: string;
}

export interface DirectusRevision {
	/** @primaryKey */
	id: number;
	activity?: DirectusActivity | string;
	collection?: string;
	item?: string;
	data?: 'json' | null;
	delta?: 'json' | null;
	parent?: DirectusRevision | string | null;
	version?: DirectusVersion | string | null;
}

export interface DirectusRole {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	parent?: DirectusRole | string | null;
	children?: DirectusRole[] | string[];
	policies?: DirectusAccess[] | string[];
	users?: DirectusUser[] | string[];
}

export interface DirectusSession {
	/** @primaryKey */
	token: string;
	user?: DirectusUser | string | null;
	expires?: string;
	ip?: string | null;
	user_agent?: string | null;
	share?: DirectusShare | string | null;
	origin?: string | null;
	next_token?: string | null;
}

export interface DirectusSettings {
	/** @primaryKey */
	id: number;
	project_name?: string;
	project_url?: string | null;
	project_color?: string;
	project_logo?: DirectusFile | string | null;
	public_foreground?: DirectusFile | string | null;
	public_background?: DirectusFile | string | null;
	public_note?: string | null;
	auth_login_attempts?: number | null;
	auth_password_policy?: null | `/^.{8,}$/` | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/` | null;
	storage_asset_transform?: 'all' | 'none' | 'presets' | null;
	storage_asset_presets?: Array<{ key: string; fit: 'contain' | 'cover' | 'inside' | 'outside'; width: number; height: number; quality: number; withoutEnlargement: boolean; format: 'auto' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif'; transforms: 'json' }> | null;
	custom_css?: string | null;
	storage_default_folder?: DirectusFolder | string | null;
	basemaps?: Array<{ name: string; type: 'raster' | 'tile' | 'style'; url: string; tileSize: number; attribution: string }> | null;
	mapbox_key?: string | null;
	module_bar?: 'json' | null;
	project_descriptor?: string | null;
	default_language?: string;
	custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
	public_favicon?: DirectusFile | string | null;
	default_appearance?: 'auto' | 'light' | 'dark';
	default_theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	default_theme_dark?: string | null;
	theme_dark_overrides?: 'json' | null;
	report_error_url?: string | null;
	report_bug_url?: string | null;
	report_feature_url?: string | null;
	public_registration?: boolean;
	public_registration_verify_email?: boolean;
	public_registration_role?: DirectusRole | string | null;
	public_registration_email_filter?: 'json' | null;
	visual_editor_urls?: Array<{ url: string }> | null;
	project_id?: string | null;
	/** @description Settings for the Command Palette Module. */
	command_palette_settings?: Record<string, any> | null;
	collaborative_editing_settings?: Record<string, any> | null;
	mcp_enabled?: boolean;
	mcp_allow_deletes?: boolean;
	mcp_prompts_collection?: string | null;
	mcp_system_prompt_enabled?: boolean;
	mcp_system_prompt?: string | null;
	flow_manager_categories?: Record<string, any> | null;
	project_owner?: string | null;
	project_usage?: string | null;
	org_name?: string | null;
	product_updates?: boolean | null;
	project_status?: string | null;
	ai_openai_api_key?: string | null;
	ai_anthropic_api_key?: string | null;
	ai_system_prompt?: string | null;
}

export interface DirectusUser {
	/** @primaryKey */
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	password?: string | null;
	location?: string | null;
	title?: string | null;
	description?: string | null;
	tags?: string[] | null;
	avatar?: DirectusFile | string | null;
	language?: string | null;
	tfa_secret?: string | null;
	status?: 'draft' | 'invited' | 'unverified' | 'active' | 'suspended' | 'archived';
	role?: DirectusRole | string | null;
	token?: string | null;
	last_access?: string | null;
	last_page?: string | null;
	provider?: 'auth0' | 'google' | 'microsoft' | 'micro';
	external_identifier?: string | null;
	auth_data?: 'json' | null;
	email_notifications?: boolean | null;
	appearance?: null | 'auto' | 'light' | 'dark' | null;
	theme_dark?: string | null;
	theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	theme_dark_overrides?: 'json' | null;
	text_direction?: 'auto' | 'ltr' | 'rtl';
	site?: Site | string | null;
	/** @description Blog posts this user has authored. */
	posts?: Post[] | string[];
	sites?: SitesDirectusUser[] | string[];
	policies?: DirectusAccess[] | string[];
}

export interface DirectusDashboard {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string;
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	color?: string | null;
	panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
	/** @primaryKey */
	id: string;
	dashboard?: DirectusDashboard | string;
	name?: string | null;
	icon?: string | null;
	color?: string | null;
	show_header?: boolean;
	note?: string | null;
	type?: string;
	position_x?: number;
	position_y?: number;
	width?: number;
	height?: number;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
	/** @primaryKey */
	id: number;
	timestamp?: string | null;
	status?: string | null;
	recipient?: DirectusUser | string;
	sender?: DirectusUser | string | null;
	subject?: string;
	message?: string | null;
	collection?: string | null;
	item?: string | null;
}

export interface DirectusShare {
	/** @primaryKey */
	id: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	role?: DirectusRole | string | null;
	password?: string | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	times_used?: number | null;
	max_uses?: number | null;
}

export interface DirectusFlow {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string | null;
	color?: string | null;
	description?: string | null;
	status?: string;
	trigger?: string | null;
	accountability?: string | null;
	options?: 'json' | null;
	operation?: DirectusOperation | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	flow_manager_category?: string | null;
	flow_manager_order?: number | null;
	flow_manager_last_run_at?: string | null;
	flow_manager_run_counter?: number | null;
	flow_manager_last_run_message?: string | null;
	flow_manager_last_run_operation?: string | null;
	operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
	/** @primaryKey */
	id: string;
	name?: string | null;
	key?: string;
	type?: string;
	position_x?: number;
	position_y?: number;
	options?: 'json' | null;
	resolve?: DirectusOperation | string | null;
	reject?: DirectusOperation | string | null;
	flow?: DirectusFlow | string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
	/** @primaryKey */
	id: string;
	/** @required */
	language: string;
	/** @required */
	key: string;
	/** @required */
	value: string;
}

export interface DirectusVersion {
	/** @primaryKey */
	id: string;
	key?: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	hash?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
	delta?: 'json' | null;
}

export interface DirectusExtension {
	enabled?: boolean;
	/** @primaryKey */
	id: string;
	folder?: string;
	source?: string;
	bundle?: string | null;
}

export interface Schema {
	ai_images: AiImage[];
	ai_prompts: AiPrompt[];
	aircraft: Aircraft[];
	announcements: Announcement[];
	announcements_files: AnnouncementsFile[];
	areas: Area[];
	attractions: Attraction[];
	block_button: BlockButton[];
	block_button_group: BlockButtonGroup[];
	block_form: BlockForm[];
	block_gallery: BlockGallery[];
	block_gallery_items: BlockGalleryItem[];
	block_hero: BlockHero[];
	block_posts: BlockPost[];
	block_pricing: BlockPricing[];
	block_pricing_cards: BlockPricingCard[];
	block_richtext: BlockRichtext[];
	brand_key_stats: BrandKeyStat[];
	brands: Brand[];
	categories: Category[];
	categories_eis: CategoriesEi[];
	cities: City[];
	cities_files: CitiesFile[];
	communities: Community[];
	continent: Continent[];
	contract_partner: ContractPartner[];
	cookie_consents: CookieConsent[];
	countries: Country[];
	country: Country[];
	courses: Course[];
	customer: Customer[];
	customer_addresses: CustomerAddresse[];
	customer_communities: CustomerCommunity[];
	customer_profile: CustomerProfile[];
	customers: Customer[];
	directus_sync_id_map: DirectusSyncIdMap[];
	drones: Drone[];
	events: Event[];
	faculties: Faculty[];
	faqs: Faq[];
	faq_section: FaqSection[];
	feed_news_item: FeedNewsItem[];
	form_fields: FormField[];
	forms: Form[];
	form_submissions: FormSubmission[];
	form_submission_values: FormSubmissionValue[];
	globals: Globals;
	kudos: Kudo[];
	languages: Language[];
	logitech_products: LogitechProduct[];
	logitech_products_gallery: LogitechProductsGallery[];
	logitech_products_retailers: LogitechProductsRetailer[];
	logitech_products_translations: LogitechProductsTranslation[];
	logitech_product_types: LogitechProductType[];
	logitech_retailers: LogitechRetailer[];
	lookup_relation: LookupRelation[];
	machines: Machine[];
	machine_telemetry: MachineTelemetry[];
	machine_types: MachineType[];
	maintenance_records: MaintenanceRecord[];
	navigation: Navigation[];
	navigation_items: NavigationItem[];
	news_item_comment: NewsItemComment[];
	order_items: OrderItem[];
	orders: Order[];
	page_blocks: PageBlock[];
	pages: Page[];
	posts: Post[];
	posts_posts: PostsPost[];
	posts_translations: PostsTranslation[];
	post_website_category: PostWebsiteCategory[];
	post_website_category_categories_eis: PostWebsiteCategoryCategoriesEi[];
	product_attribute_keys: ProductAttributeKey[];
	product_attributes: ProductAttribute[];
	product_images: ProductImage[];
	products: Product[];
	products_categories: ProductsCategory[];
	products_files: ProductsFile[];
	products_files_1: ProductsFiles1[];
	product_variants: ProductVariant[];
	properties: Property[];
	properties_files: PropertiesFile[];
	property_addresses: PropertyAddresse[];
	redirects: Redirect[];
	refund_request: RefundRequest[];
	rentals: Rental[];
	sheduled_versions: SheduledVersion[];
	ships: Ship[];
	site_a_specific: SiteASpecific[];
	sites: Site[];
	sites_directus_users: SitesDirectusUser[];
	students: Student[];
	students_courses: StudentsCourse[];
	submarines: Submarine[];
	submarines_files: SubmarinesFile[];
	tax_rates: TaxRate[];
	website_logins: WebsiteLogin[];
	website_user: WebsiteUser[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollection[];
	directus_comments: DirectusComment[];
	directus_fields: DirectusField[];
	directus_files: DirectusFile[];
	directus_folders: DirectusFolder[];
	directus_migrations: DirectusMigration[];
	directus_permissions: DirectusPermission[];
	directus_policies: DirectusPolicy[];
	directus_presets: DirectusPreset[];
	directus_relations: DirectusRelation[];
	directus_revisions: DirectusRevision[];
	directus_roles: DirectusRole[];
	directus_sessions: DirectusSession[];
	directus_settings: DirectusSettings;
	directus_users: DirectusUser[];
	directus_dashboards: DirectusDashboard[];
	directus_panels: DirectusPanel[];
	directus_notifications: DirectusNotification[];
	directus_shares: DirectusShare[];
	directus_flows: DirectusFlow[];
	directus_operations: DirectusOperation[];
	directus_translations: DirectusTranslation[];
	directus_versions: DirectusVersion[];
	directus_extensions: DirectusExtension[];
}

export enum CollectionNames {
	ai_images = 'ai_images',
	ai_prompts = 'ai_prompts',
	aircraft = 'aircraft',
	announcements = 'announcements',
	announcements_files = 'announcements_files',
	areas = 'areas',
	attractions = 'attractions',
	block_button = 'block_button',
	block_button_group = 'block_button_group',
	block_form = 'block_form',
	block_gallery = 'block_gallery',
	block_gallery_items = 'block_gallery_items',
	block_hero = 'block_hero',
	block_posts = 'block_posts',
	block_pricing = 'block_pricing',
	block_pricing_cards = 'block_pricing_cards',
	block_richtext = 'block_richtext',
	brand_key_stats = 'brand_key_stats',
	brands = 'brands',
	categories = 'categories',
	categories_eis = 'categories_eis',
	cities = 'cities',
	cities_files = 'cities_files',
	communities = 'communities',
	continent = 'continent',
	contract_partner = 'contract_partner',
	cookie_consents = 'cookie_consents',
	countries = 'countries',
	country = 'country',
	courses = 'courses',
	customer = 'customer',
	customer_addresses = 'customer_addresses',
	customer_communities = 'customer_communities',
	customer_profile = 'customer_profile',
	customers = 'customers',
	directus_sync_id_map = 'directus_sync_id_map',
	drones = 'drones',
	events = 'events',
	faculties = 'faculties',
	faqs = 'faqs',
	faq_section = 'faq_section',
	feed_news_item = 'feed_news_item',
	form_fields = 'form_fields',
	forms = 'forms',
	form_submissions = 'form_submissions',
	form_submission_values = 'form_submission_values',
	globals = 'globals',
	kudos = 'kudos',
	languages = 'languages',
	logitech_products = 'logitech_products',
	logitech_products_gallery = 'logitech_products_gallery',
	logitech_products_retailers = 'logitech_products_retailers',
	logitech_products_translations = 'logitech_products_translations',
	logitech_product_types = 'logitech_product_types',
	logitech_retailers = 'logitech_retailers',
	lookup_relation = 'lookup_relation',
	machines = 'machines',
	machine_telemetry = 'machine_telemetry',
	machine_types = 'machine_types',
	maintenance_records = 'maintenance_records',
	navigation = 'navigation',
	navigation_items = 'navigation_items',
	news_item_comment = 'news_item_comment',
	order_items = 'order_items',
	orders = 'orders',
	page_blocks = 'page_blocks',
	pages = 'pages',
	posts = 'posts',
	posts_posts = 'posts_posts',
	posts_translations = 'posts_translations',
	post_website_category = 'post_website_category',
	post_website_category_categories_eis = 'post_website_category_categories_eis',
	product_attribute_keys = 'product_attribute_keys',
	product_attributes = 'product_attributes',
	product_images = 'product_images',
	products = 'products',
	products_categories = 'products_categories',
	products_files = 'products_files',
	products_files_1 = 'products_files_1',
	product_variants = 'product_variants',
	properties = 'properties',
	properties_files = 'properties_files',
	property_addresses = 'property_addresses',
	redirects = 'redirects',
	refund_request = 'refund_request',
	rentals = 'rentals',
	sheduled_versions = 'sheduled_versions',
	ships = 'ships',
	site_a_specific = 'site_a_specific',
	sites = 'sites',
	sites_directus_users = 'sites_directus_users',
	students = 'students',
	students_courses = 'students_courses',
	submarines = 'submarines',
	submarines_files = 'submarines_files',
	tax_rates = 'tax_rates',
	website_logins = 'website_logins',
	website_user = 'website_user',
	directus_access = 'directus_access',
	directus_activity = 'directus_activity',
	directus_collections = 'directus_collections',
	directus_comments = 'directus_comments',
	directus_fields = 'directus_fields',
	directus_files = 'directus_files',
	directus_folders = 'directus_folders',
	directus_migrations = 'directus_migrations',
	directus_permissions = 'directus_permissions',
	directus_policies = 'directus_policies',
	directus_presets = 'directus_presets',
	directus_relations = 'directus_relations',
	directus_revisions = 'directus_revisions',
	directus_roles = 'directus_roles',
	directus_sessions = 'directus_sessions',
	directus_settings = 'directus_settings',
	directus_users = 'directus_users',
	directus_dashboards = 'directus_dashboards',
	directus_panels = 'directus_panels',
	directus_notifications = 'directus_notifications',
	directus_shares = 'directus_shares',
	directus_flows = 'directus_flows',
	directus_operations = 'directus_operations',
	directus_translations = 'directus_translations',
	directus_versions = 'directus_versions',
	directus_extensions = 'directus_extensions'
}