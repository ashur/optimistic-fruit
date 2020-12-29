let fruits = [
	{
		slug: "apple",
		name: "Apple",
		emoji: "🍎",
		description: "An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."
	},
	{
		slug: "banana",
		name: "Banana",
		emoji: "🍌",
		description: "A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called “plantains”, distinguishing them from dessert bananas. The fruit is variable in size, color, and firmness, but is usually elongated and curved, with soft flesh rich in starch covered with a rind, which may be green, yellow, red, purple, or brown when ripe."
	},
];

function renderPage({ title, description })
{
	return `<!DOCTYPE html>
<html lang="en"><head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
</head>
<body>
	<main>
		<h1>${title}</h1>
		<p>${description}</p>
	</main>

	<footer>
		<p>Served dynamically 🤹‍♀️</p>
	</footer>
</body>
</html>
`;
}

module.exports.handler = async (event) =>
{
	let response = {
		body: "",
	};

	if( event.httpMethod === "GET" )
	{
		let slug = event.queryStringParameters.slug;
		if( slug )
		{
			// Strip trailing slashes appended by redirect
			slug = slug.replace( "/", "" );

			let fruit = fruits.find( fruit => fruit.slug === slug );
			if( fruit )
			{
				response.statusCode = 200;
				response.body = renderPage({
					title: `${fruit.name} ${fruit.emoji}`,
					description: fruit.description,
				});
			}
			else
			{
				response.statusCode = 404;
				response.body = renderPage({
					title: "Not Found",
					description: `Could not find a record of '${slug}' in our records.`,
				});
			}
		}
		else
		{
			response.statusCode = 404;
			response.body = renderPage({
				title: "Bad Request",
				description: `Missing required parameter 'slug'`,
			});
		}
	}
	else
	{
		response.statusCode = 405;
		response.body = renderPage({
			title: "Method Not Allowed",
			description: "Sorry, GET only for now.",
		});
	}

	return response;
};
