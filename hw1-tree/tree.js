// Tree function
const tree = (node, level = 0, lastChild = [], key = null) => {
  const displayKey = key !== null ? `${key}: ` : "";
  const displayValue = typeof node === "object" ? "" : node;

  if (level > 0) {
    const prefix = lastChild
      .slice(0, level - 1)
      .map((isLast) => (isLast ? "    " : "│   "))
      .join("");

    if (displayValue || displayKey) {
      console.log(`${prefix}${lastChild[level - 1] ? "└── " : "├── "}${displayKey}${displayValue}`);
    }
  } else if (displayValue) {
    console.log(displayValue);
  }

  if (typeof node === "object") {
    const keys = Object.keys(node);
    const lastIndex = keys.length - 1;

    keys.forEach((key, index) => {
      if (Array.isArray(node[key])) {
        node[key].forEach((item, itemIndex) => {
          const isLastItem = itemIndex === node[key].length - 1;
          tree(item, level + 1, [...lastChild, index === lastIndex && isLastItem], `${key}[${itemIndex}]`);
        });
      } else {
        tree(node[key], level + 1, [...lastChild, index === lastIndex], key);
      }
    });
  }
};

// Testing the tree function
const testData = {
	name: "Kostya",
	role: "Prompt engineer 😂",
	skills: [
		{
			name: "Javascript",
			level: "4/10",
			libraries: [
				{ name: "React" },
				{ name: "Next" },
				{ name: "Express" },
			],
		},
		{
			name: "Python",
			level: "7/10",
			libraries: [
				{ name: "numpy" },
				{ name: "opencv" },
				{ name: "pyTelegramBotApi" },
				{ name: "flask" },
			],
		},
		{
			name: "Rust",
			level: "3/10",
			libraries: [
				{ name: "actix-web" },
				{ name: "tokio" },
				{ name: "web3" },
			],
		},
	],
}

const hwData = {
	"name": 1,
	"items": [{
		"name": 2,
		"items": [{ "name": 3 }, { "name": 4 }]
	}, {
		"name": 5,
		"items": [{ "name": 6 }]
	}]
}

tree(hwData);
