import Mention from "../partials/Mention";

export function renderContentWithMentions(text, getUserInfo) {
  const urlRegex = /https?:\/\/[^\s]+/i;

  const parts = text.split(/(\s+)/); // boşlukları koruyarak ayırıyoruz

  return parts.map((part, i) => {
    if (part.startsWith("@")) {
      const username = part.slice(1);
      return (
        <Mention
          key={`mention-${i}`}
          username={username}
          getUserInfo={getUserInfo}
        />
      );
    }

    if (urlRegex.test(part)) {
      return (
        <a
          key={`link-${i}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}
