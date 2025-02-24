const createDynamicContent = {
  button: ({buttons, body}) => {
    if (!Array.isArray(buttons)) {
      throw new Error("Buttons must be an array.");
    }
    if (buttons.length === 0 || buttons.length > 3) {
      throw new Error("You can have between 1 and 3 buttons.");
    }
    buttons.forEach((button, index) => {
      if (!button.type || !["reply", "url"].includes(button.type)) {
        throw new Error(`Button at index ${index} must have a valid type ('reply' or 'url').`);
      }
      if (!button.text || button.text.length === 0 || button.text.length > 20) {
        throw new Error(`Button text at index ${index} must be between 1 and 20 characters.`);
      }
      if (button.type === "url") {
        if (!button.url || typeof button.url !== 'string') {
          throw new Error(`Button URL at index ${index} is required and must be a string.`);
        }
        try {
          new URL(button.url);
        } catch {
          throw new Error(`Button URL at index ${index} is not a valid URL.`);
        }
      }
    });
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
          buttons
        }
      }
    };
  },
  document: ({ link, body, fileName }) => {
    if (!link || typeof link !== 'string') {
      throw new Error("Link is required and must be a string.");
    }
    try {
      new URL(link);
    } catch {
      throw new Error("Link must be a valid URL.");
    }
    if (body && typeof body !== 'string') {
      throw new Error("Body must be a string.");
    }
    if (body && body.length > 1024) {
      throw new Error("Body text cannot exceed 1024 characters.");
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
        link,
        caption: body,
        fileName
      }
    };
  },
  image: ({ link, body }) => {
    if (!link || typeof link !== 'string') {
      throw new Error("Link is required and must be a string.");
    }
    try {
      new URL(link);
    } catch {
      throw new Error("Link must be a valid URL.");
    }
    if (body && typeof body !== 'string') {
      throw new Error("Caption must be a string.");
    }
    if (body && body.length > 1024) {
      throw new Error("Caption text cannot exceed 1024 characters.");
    }
    return {
      recipient_type: 'individual',
      type: 'image',
      image: {
        link,
        caption: body
      }
    };
  },
  cta: ({ header, body, footer, buttonText, buttonLink }) => {
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
    try {
      new URL(buttonLink);
    } catch {
      throw new Error("Button link must be a valid URL.");
    }
    return {
      recipient_type: 'individual',
      type: 'interactive',
      interactive: {
        type: 'cta_url',
        action: {
          name: 'cta_url',
          parameters: {
            display_text: buttonText,
            url: buttonLink
          }
        },
        header: header ? {
          type: 'text',
          text: header
        } : undefined,
        body: {
          type: 'text',
          text: body
        },
        footer: footer ? {
          type: 'text',
          text: footer
        } : undefined
      }
    };
  },
  askLocation: ({body}) => {
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
  },
  sendLocation: ({ latitude, longitude, name, address }) => {
    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be a number between -90 and 90.");
    }
    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be a number between -180 and 180.");
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
        latitude,
        longitude,
        name,
        address
      }
    };
  },
  sticker: ({ id }) => {
    if (!id || typeof id !== 'string') {
      throw new Error("Sticker ID is required and must be a string.");
    }
    return {
      recipient_type: 'individual',
      type: 'sticker',
      sticker: {
        id
      }
    };
  },
  text: ({body}) => {
    if (!body || typeof body !== 'string') {
      throw new Error("Body text is required and must be a string.");
    }
    if (body.length > 4096) {
      throw new Error("Body text cannot exceed 4096 characters.");
    }
    return {
      recipient_type: 'individual',
      type: 'text',
      text: {
        body
      }
    };
  },
  video: ({ link, body }) => {
    if (!link || typeof link !== 'string') {
      throw new Error("Link is required and must be a string.");
    }
    try {
      new URL(link);
    } catch {
      throw new Error("Link must be a valid URL.");
    }
    if (body && typeof body !== 'string') {
      throw new Error("Caption must be a string.");
    }
    if (body && body.length > 1024) {
      throw new Error("Caption text cannot exceed 1024 characters.");
    }
    return {
      recipient_type: 'individual',
      type: 'video',
      video: {
        link,
        caption: body
      }
    };
  },
  contact: ({ name, phoneNumber }) => {
    if (!name || typeof name !== 'string' || name.length === 0 || name.length > 256) {
      throw new Error("Name is required, must be a string, and cannot exceed 256 characters.");
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneRegex.test(phoneNumber)) {
      throw new Error("Phone number is required and must be in E.164 format.");
    }
    return {
      recipient_type: 'individual',
      type: 'contact',
      contact: {
        name,
        phoneNumber
      }
    };
  },
  flows: ({ body, flowToken, flowId, buttonText, screenName, payload }) => {
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
  },
  list: ({ body, buttonText, sections, footer }) => {
    if (!body || typeof body !== 'string' || body.length === 0 || body.length > 1024) {
      throw new Error("Body text is required and must be between 1 and 1024 characters.");
    }
    if (!buttonText || typeof buttonText !== 'string' || buttonText.length === 0 || buttonText.length > 20) {
      throw new Error("Button text is required and must be between 1 and 20 characters.");
    }
    if (!Array.isArray(sections) || sections.length === 0 || sections.length > 10) {
      throw new Error("Sections must be an array with 1 to 10 sections.");
    }
    sections.forEach((section, secIndex) => {
      if (section.title && (typeof section.title !== 'string' || section.title.length > 25)) {
        throw new Error(`Section title at index ${secIndex} must be a string and cannot exceed 25 characters.`);
      }
      if (!Array.isArray(section.rows) || section.rows.length === 0 || section.rows.length > 10) {
        throw new Error(`Section at index ${secIndex} must have between 1 and 10 rows.`);
      }
      section.rows.forEach((row, rowIndex) => {
        if (!row.id || typeof row.id !== 'string' || row.id.length === 0 || row.id.length > 200) {
          throw new Error(`Row ID at section ${secIndex}, row ${rowIndex} is required and must be between 1 and 200 characters.`);
        }
        if (!row.title || typeof row.title !== 'string' || row.title.length === 0 || row.title.length > 24) {
          throw new Error(`Row title at section ${secIndex}, row ${rowIndex} is required and must be between 1 and 24 characters.`);
        }
      });
    });
    if (footer && (typeof footer !== 'string' || footer.length > 60)) {
      throw new Error("Footer text must be a string and cannot exceed 60 characters.");
    }
    return {
      recipient_type: 'individual',
      type: 'interactive',
      interactive: {
        type: 'list',
        header: "",
        body: {
          text: body
        },
        action: {
          button: buttonText,
          sections: sections.map(section => ({
            title: section.title,
            rows: section.rows.map(row => ({
              id: row.id,
              title: row.title
            }))
          }))
        },
        footer: footer ? {
          text: footer
        } : undefined
      }
    };
  }
};
function run() {
	try {
		// Button test
		const buttonMessage = createDynamicContent.button({
			buttons: [
				{ type: 'reply', text: 'Yes' },
				{ type: 'reply', text: 'No' }
			],
			body: 'Do you agree?'
		});
		console.log('Button Message:', buttonMessage);

		// Document test
		const documentMessage = createDynamicContent.document({
			link: 'https://example.com/document.pdf',
			body: 'Please review the document.',
			fileName: 'document.pdf'
		});
		console.log('Document Message:', documentMessage);

		// Image test
		const imageMessage = createDynamicContent.image({
			link: 'https://example.com/image.jpg',
			body: 'Here is an image for you.'
		});
		console.log('Image Message:', imageMessage);

		// CTA test
		const ctaMessage = createDynamicContent.cta({
			header: 'Welcome',
			body: 'Click the button below.',
			footer: 'Thank you!',
			buttonText: 'Visit Website',
			buttonLink: 'https://example.com'
		});
		console.log('CTA Message:', ctaMessage);

		// Ask Location test
		const askLocationMessage = createDynamicContent.askLocation({
			body: 'Please share your location.'
		});
		console.log('Ask Location Message:', askLocationMessage);

		// Send Location test
		const sendLocationMessage = createDynamicContent.sendLocation({
			latitude: 37.7749,
			longitude: -122.4194,
			name: 'San Francisco',
			address: 'California, USA'
		});
		console.log('Send Location Message:', sendLocationMessage);

		// Sticker test
		const stickerMessage = createDynamicContent.sticker({
			id: '1234567890123456789012345678901234567890123456789012345678901234'
		});
		console.log('Sticker Message:', stickerMessage);

		// Text test
		const textMessage = createDynamicContent.text({
			body: 'Hello, this is a text message.'
		});
		console.log('Text Message:', textMessage);

		// Video test
		const videoMessage = createDynamicContent.video({
			link: 'https://example.com/video.mp4',
			body: 'Check out this video!'
		});
		console.log('Video Message:', videoMessage);

		// Contact test
		const contactMessage = createDynamicContent.contact({
			name: 'John Doe',
			phoneNumber: '+1234567890'
		});
		console.log('Contact Message:', contactMessage);

		// Flows test
		const flowsMessage = createDynamicContent.flows({
			body: 'Choose an option.',
			flowToken: 'flowToken123',
			flowId: 'flowId456',
			buttonText: 'Start Flow',
			screenName: 'MainScreen',
			payload: { key: 'value' }
		});
		console.log('Flows Message:', flowsMessage);

		// List test
		const listMessage = createDynamicContent.list({
			body: 'Please select an option from the list.',
			buttonText: 'View List',
			sections: [
				{
					rows: [
						{ id: '1', title: 'Option 1' },
						{ id: '2', title: 'Option 2' }
					]
				}
			],
			footer: 'Thank you for selecting!'
		});
		console.log('List Message:', listMessage);

	} catch (err) {
    console.log(err.message)
		return createDynamicContent.text({ body: err.message });
	}
}

run()