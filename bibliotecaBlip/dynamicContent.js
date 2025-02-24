/**
 * Para testar uma das funções abaixo, descomente a chamada da função desejada.
 * Passe o mouse sobre o nome da função descomentada para ver um exemplo de como utilizá-la.
 */
function run() {
    try {
        // var message = createButton()
        // var message = createDocument()
        // var message = createImage()
        // var message = createCta()
        // var message = createAskLocation()
        // var message = createSendLocation()
        // var message = createSticker()
        // var message = createText()
        // var message = createVideo()
        // var message = createContact()
        // var message = createFlows()
        // var message = createList()
    } catch (err) {
        return createText({ body: err.message });
    }
}
/**
 * Creates a WhatsApp interactive button message.
 *
 * @param {Object} config - Configuration for the button message.
 * @param {Array} config.buttons - Array of button objects.
 * @param {string} config.body - The body text of the message.
 * @returns {Object} - The formatted button message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createButton({
 *   buttons: [
 *     { type: 'reply', id: 'yes_button', title: 'Yes' },
 *     { type: 'reply', id: 'no_button', title: 'No' }
 *   ],
 *   body: 'Do you agree?'
 * });
 */
function createButton(config) {
    var buttons = config.buttons;
    var body = config.body;

    if (!Array.isArray(buttons)) {
        throw new Error("Buttons must be an array.");
    }
    if (buttons.length === 0 || buttons.length > 3) {
        throw new Error("You can have between 1 and 3 buttons.");
    }
    var formattedButtons = [];
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        if (!button.type || (button.type !== "reply" && button.type !== "url")) {
            throw new Error("Button type must be 'reply' or 'url'.");
        }
        if (!button.title || button.title.length === 0 || button.title.length > 20) {
            throw new Error("Button title must be between 1 and 20 characters.");
        }

        if (button.type === "reply") {
            if (!button.id || typeof button.id !== 'string' || button.id.length === 0) {
                throw new Error("Reply buttons must have a valid 'id'.");
            }
            formattedButtons.push({
                type: "reply",
                reply: {
                    id: button.id,
                    title: button.title
                }
            });
        } else if (button.type === "url") {
            if (!button.url || typeof button.url !== 'string') {
                throw new Error("URL buttons must have a valid 'url'.");
            }
            formattedButtons.push({
                type: "url",
                url: {
                    url: button.url,
                    title: button.title
                }
            });
        }
    }

    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
        throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'interactive',
        interactive: {
            type: 'button',
            body: {
                text: body
            },
            action: {
                buttons: formattedButtons
            }
        }
    };
}

/**
 * Creates a WhatsApp document message.
 *
 * @param {Object} config - Configuration for the document message.
 * @param {string} config.link - URL to the document.
 * @param {string} [config.caption] - Caption for the document.
 * @param {string} config.fileName - Name of the document file.
 * @returns {Object} - The formatted document message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createDocument({
 *   link: 'https://example.com/document.pdf',
 *   caption: 'Please review the document.',
 *   fileName: 'document.pdf'
 * });
 */
function createDocument(config) {
    var link = config.link;
    var caption = config.caption;
    var fileName = config.fileName;

    if (!link || typeof link !== 'string') {
        throw new Error("Link is required and must be a string.");
    }
    if (caption && (typeof caption !== 'string' || caption.length > 1024)) {
        throw new Error("Caption must be a string and cannot exceed 1024 characters.");
    }
    if (!fileName || typeof fileName !== 'string') {
        throw new Error("File name is required and must be a string.");
    }
    if (fileName.length > 256) {
        throw new Error("File name cannot exceed 256 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'document',
        document: {
            link: link,
            caption: caption,
            filename: fileName
        }
    };
}

/**
 * Creates a WhatsApp image message.
 *
 * @param {Object} config - Configuration for the image message.
 * @param {string} config.link - URL to the image.
 * @param {string} [config.caption] - Caption for the image.
 * @returns {Object} - The formatted image message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createImage({
 *   link: 'https://example.com/image.jpg',
 *   caption: 'Here is an image for you.'
 * });
 */
function createImage(config) {
    var link = config.link;
    var caption = config.caption;

    if (!link || typeof link !== 'string') {
        throw new Error("Link is required and must be a string.");
    }

    if (caption && (typeof caption !== 'string' || caption.length > 1024)) {
        throw new Error("Caption must be a string and cannot exceed 1024 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'image',
        image: {
            link: link,
            caption: caption
        }
    };
}

/**
 * Creates a WhatsApp Call-To-Action (CTA) message.
 *
 * @param {Object} config - Configuration for the CTA message.
 * @param {string} [config.header] - Header text of the message.
 * @param {string} config.body - Body text of the message.
 * @param {string} [config.footer] - Footer text of the message.
 * @param {string} config.buttonText - Text displayed on the CTA button.
 * @param {string} config.buttonLink - URL the CTA button directs to.
 * @returns {Object} - The formatted CTA message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createCta({
 *   header: 'Welcome',
 *   body: 'Click the button below.',
 *   footer: 'Thank you!',
 *   buttonText: 'Visit Website',
 *   buttonLink: 'https://example.com'
 * });
 */
function createCta(config) {
    var header = config.header;
    var body = config.body;
    var footer = config.footer;
    var buttonText = config.buttonText;
    var buttonLink = config.buttonLink;

    if (header && (typeof header !== 'string' || header.length > 60)) {
        throw new Error("Header text must be a string and cannot exceed 60 characters.");
    }
    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
        throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }
    if (footer && (typeof footer !== 'string' || footer.length > 60)) {
        throw new Error("Footer text must be a string and cannot exceed 60 characters.");
    }
    if (!buttonText || typeof buttonText !== 'string' || buttonText.length === 0 || buttonText.length > 20) {
        throw new Error("Button text is required and must be between 1 and 20 characters.");
    }
    if (!buttonLink || typeof buttonLink !== 'string') {
        throw new Error("Button link is required and must be a string.");
    }

    var interactive = {
        type: 'cta_url',
        action: {
            name: 'cta_url',
            parameters: {
                display_text: buttonText,
                url: buttonLink
            }
        },
        body: {
            text: body
        }
    };

    if (header) {
        interactive.header = {
            type: 'text',
            text: header
        };
    }
    if (footer) {
        interactive.footer = {
            text: footer
        };
    }

    return {
        recipient_type: 'individual',
        type: 'interactive',
        interactive: interactive
    };
}

/**
 * Creates a WhatsApp location request message.
 *
 * @param {Object} config - Configuration for the location request message.
 * @param {string} config.body - The body text of the message.
 * @returns {Object} - The formatted location request message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createAskLocation({
 *   body: 'Please share your location.'
 * });
 */
function createAskLocation(config) {
    var body = config.body;

    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
        throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'interactive',
        interactive: {
            type: 'location_request_message',
            body: {
                text: body
            },
            action: {
                name: 'send_location'
            }
        }
    };
}

/**
 * Creates a WhatsApp send location message.
 *
 * @param {Object} config - Configuration for the send location message.
 * @param {number} config.latitude - Latitude of the location.
 * @param {number} config.longitude - Longitude of the location.
 * @param {string} [config.name] - Name of the location.
 * @param {string} [config.address] - Address of the location.
 * @returns {Object} - The formatted send location message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createSendLocation({
 *   latitude: 37.7749,
 *   longitude: -122.4194,
 *   name: 'San Francisco',
 *   address: 'California, USA'
 * });
 */
function createSendLocation(config) {
    var latitude = config.latitude;
    var longitude = config.longitude;
    var name = config.name;
    var address = config.address;

    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
        throw new Error("Latitude must be a number between -90 and 90.");
    }
    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
        throw new Error("Longitude must be a number between -180 e 180.");
    }
    if (name && (typeof name !== 'string' || name.length > 100)) {
        throw new Error("Name must be a string and cannot exceed 100 characters.");
    }
    if (address && (typeof address !== 'string' || address.length > 300)) {
        throw new Error("Address must be a string and cannot exceed 300 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'location',
        location: {
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address
        }
    };
}

/**
 * Creates a WhatsApp sticker message.
 *
 * @param {Object} config - Configuration for the sticker message.
 * @param {string} config.id - ID of the sticker.
 * @returns {Object} - The formatted sticker message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createSticker({
 *   id: '1234567890123456789012345678901234567890123456789012345678901234'
 * });
 */
function createSticker(config) {
    var id = config.id;

    if (!id || typeof id !== 'string') {
        throw new Error("Sticker ID is required and must be a string.");
    }
    // Opcional: adicionar regex para validar o formato do ID do sticker

    return {
        recipient_type: 'individual',
        type: 'sticker',
        sticker: {
            id: id
        }
    };
}

/**
 * Creates a WhatsApp text message.
 *
 * @param {Object} config - Configuration for the text message.
 * @param {string} config.body - The body text of the message.
 * @returns {Object} - The formatted text message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createText({
 *   body: 'Hello, this is a text message.'
 * });
 */
function createText(config) {
    var body = config.body;

    if (!body || typeof body !== 'string') {
        throw new Error("Body text is required and must be a string.");
    }
    if (body.length > 4096) { // Limite máximo de caracteres para mensagens de texto no WhatsApp
        throw new Error("Body text cannot exceed 4096 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'text',
        text: {
            body: body
        }
    };
}

/**
 * Creates a WhatsApp video message.
 *
 * @param {Object} config - Configuration for the video message.
 * @param {string} config.link - URL to the video.
 * @param {string} [config.caption] - Caption for the video.
 * @returns {Object} - The formatted video message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createVideo({
 *   link: 'https://example.com/video.mp4',
 *   caption: 'Check out this video!'
 * });
 */
function createVideo(config) {
    var link = config.link;
    var caption = config.caption;

    if (!link || typeof link !== 'string') {
        throw new Error("Link is required and must be a string.");
    }

    if (caption && (typeof caption !== 'string' || caption.length > 1024)) {
        throw new Error("Caption must be a string and cannot exceed 1024 characters.");
    }

    return {
        recipient_type: 'individual',
        type: 'video',
        video: {
            link: link,
            caption: caption
        }
    };
}

/**
 * Creates a WhatsApp contact message.
 *
 * @param {Object} config - Configuration for the contact message.
 * @param {string} config.name - Name of the contact.
 * @param {string} config.phoneNumber - Phone number of the contact in E.164 format.
 * @returns {Object} - The formatted contact message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createContact({
 *   name: 'John Doe',
 *   phoneNumber: '+1234567890'
 * });
 */
function createContact(config) {
    var name = config.name;
    var phoneNumber = config.phoneNumber;

    if (!name || typeof name !== 'string' || name.length === 0 || name.length > 256) {
        throw new Error("Name is required, must be a string, and cannot exceed 256 characters.");
    }
    var phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneRegex.test(phoneNumber)) {
        throw new Error("Phone number is required and must be in E.164 format.");
    }

    return {
        recipient_type: 'individual',
        type: 'contact',
        contact: {
            name: name,
            phone_number: phoneNumber
        }
    };
}

/**
 * Creates a WhatsApp flows interactive message.
 *
 * @param {Object} config - Configuration for the flows message.
 * @param {string} config.body - The body text of the message.
 * @param {string} config.flowToken - Token for the flow.
 * @param {string} config.flowId - ID of the flow.
 * @param {string} config.buttonText - Text displayed on the flow button.
 * @param {string} config.screenName - Name of the screen in the flow.
 * @param {Object} config.payload - Additional data for the flow action.
 * @returns {Object} - The formatted flows message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createFlows({
 *   body: 'Choose an option.',
 *   flowToken: 'flowToken123',
 *   flowId: 'flowId456',
 *   buttonText: 'Start Flow',
 *   screenName: 'MainScreen',
 *   payload: { key: 'value' }
 * });
 */
function createFlows(config) {
    var body = config.body;
    var flowToken = config.flowToken;
    var flowId = config.flowId;
    var buttonText = config.buttonText;
    var screenName = config.screenName;
    var payload = config.payload;

    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
        throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }
    if (!flowToken || typeof flowToken !== 'string') {
        throw new Error("Flow token is required and must be a string.");
    }
    if (!flowId || typeof flowId !== 'string') {
        throw new Error("Flow ID is required and must be a string.");
    }
    if (!buttonText || typeof buttonText !== 'string' || buttonText.length === 0 || buttonText.length > 20) {
        throw new Error("Button text is required and must be between 1 and 20 characters.");
    }
    if (!screenName || typeof screenName !== 'string') {
        throw new Error("Screen name is required and must be a string.");
    }
    if (!payload || typeof payload !== 'object') {
        throw new Error("Payload is required and must be an object.");
    }

    return {
        recipient_type: 'individual',
        messaging_product: 'whatsapp',
        type: 'interactive',
        interactive: {
            type: 'flow',
            body: {
                text: body
            },
            action: {
                name: 'flow',
                parameters: {
                    flow_message_version: "3",
                    flow_token: flowToken,
                    flow_id: flowId,
                    flow_cta: buttonText,
                    flow_action: "navigate",
                    flow_action_payload: {
                        screen: screenName,
                        data: payload
                    }
                }
            }
        }
    };
}

/**
 * Creates a WhatsApp list interactive message.
 *
 * @param {Object} config - Configuration for the list message.
 * @param {string} config.body - The body text of the message.
 * @param {string} config.buttonText - Text displayed on the action button.
 * @param {Array} config.sections - Array of sections, each containing rows.
 * @param {string} [config.footer] - Footer text of the message.
 * @returns {Object} - The formatted list message object.
 * @throws {Error} - If validation fails.
 *
 * @example
 * var message = createList({
 *   body: 'Please select an option from the list.',
 *   buttonText: 'View List',
 *   sections: [
 *     {
 *       title: 'Section 1',
 *       rows: [
 *         { id: '1', title: 'Option 1', description: 'Description for Option 1' },
 *         { id: '2', title: 'Option 2' } // Sem descrição
 *       ]
 *     },
 *     {
 *       title: 'Section 2',
 *       rows: [
 *         { id: '3', title: 'Option 3', description: 'Description for Option 3' }
 *       ]
 *     }
 *   ],
 *   footer: 'Thank you for selecting!'
 * });
 */
function createList(config) {
    var body = config.body;
    var buttonText = config.buttonText;
    var sections = config.sections;
    var footer = config.footer;

    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
        throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }
    if (!buttonText || typeof buttonText !== 'string' || buttonText.length === 0 || buttonText.length > 20) {
        throw new Error("Button text is required and must be between 1 and 20 characters.");
    }
    if (!Array.isArray(sections) || sections.length === 0 || sections.length > 10) {
        throw new Error("Sections must be an array with 1 to 10 sections.");
    }

    var formattedSections = [];
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if (section.title && (typeof section.title !== 'string' || section.title.length > 25)) {
            throw new Error("Section title must be a string and cannot exceed 25 characters.");
        }
        if (!Array.isArray(section.rows) || section.rows.length === 0 || section.rows.length > 10) {
            throw new Error("Each section must have between 1 and 10 rows.");
        }

        var formattedRows = [];
        for (var j = 0; j < section.rows.length; j++) {
            var row = section.rows[j];
            if (!row.id || typeof row.id !== 'string' || row.id.length === 0 || row.id.length > 200) {
                throw new Error("Row ID must be a string between 1 and 200 characters.");
            }
            if (!row.title || typeof row.title !== 'string' || row.title.length === 0 || row.title.length > 24) {
                throw new Error("Row title must be a string between 1 and 24 characters.");
            }
            if (row.description && (typeof row.description !== 'string' || row.description.length > 72)) {
                throw new Error("Row description must be a string and cannot exceed 72 characters.");
            }

            var rowObject = {
                id: row.id,
                title: row.title
            };

            if (row.description) {
                rowObject.description = row.description;
            }

            formattedRows.push(rowObject);
        }

        formattedSections.push({
            title: section.title || "",
            rows: formattedRows
        });
    }

    if (footer && (typeof footer !== 'string' || footer.length > 60)) {
        throw new Error("Footer text must be a string and cannot exceed 60 characters.");
    }

    var action = {
        button: buttonText,
        sections: formattedSections
    };

    var interactive = {
        type: 'list',
        body: {
            text: body
        },
        action: action
    };

    if (footer) {
        interactive.footer = {
            text: footer
        };
    }

    return {
        recipient_type: 'individual',
        type: 'interactive',
        interactive: interactive
    };
}