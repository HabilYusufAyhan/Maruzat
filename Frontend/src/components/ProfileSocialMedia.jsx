import {
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Music,
  Github,
  Globe,
  Music2,
} from "lucide-react";
export const ProfileSocialMedia = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sosyal Medya</h3>
      <div className="flex space-x-4">
        {user.socials.twitter && (
          <a
            href={user.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="Twitter"
          >
            <Twitter size={24} />
          </a>
        )}
        {user.socials.instagram && (
          <a
            href={user.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="Instagram"
          >
            <Instagram size={24} />
          </a>
        )}
        {user.socials.linkedin && (
          <a
            href={user.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        )}

        {user.socials.facebook && (
          <a
            href={user.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="Facebook"
          >
            <Facebook size={24} />
          </a>
        )}
        {user.socials.youtube && (
          <a
            href={user.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="YouTube"
          >
            <Youtube size={24} />
          </a>
        )}
        {user.socials.tiktok && (
          <a
            href={user.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            className="text-blue-500 hover:text-blue-700"
          >
            <Music2 size={24} />
          </a>
        )}
        {user.socials.github && (
          <a
            href={user.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="GitHub"
          >
            <Github size={24} />
          </a>
        )}
        {user.socials.website && (
          <a
            href={user.socials.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="Website"
          >
            <Globe size={24} />
          </a>
        )}
      </div>
    </div>
  );
};
