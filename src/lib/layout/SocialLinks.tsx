import { Copyright } from "./Copyright";
import { socialPlatforms } from "./const";
import SocialButton from "./SocialButton";

export function SocialLinks() {
  return (
    <div className="md:col-span-4 mt-8 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/30">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <Copyright />
        <div className="flex gap-4">
          {socialPlatforms.map((social) => (
            <SocialButton key={social} social={social} />
          ))}
        </div>
      </div>
    </div>
  );
}
