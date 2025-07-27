import React from "react";

interface Badge {
  text: string;
  variant: "recommended" | "free" | "advanced";
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  badge?: Badge;
  isEnabled?: boolean;
  showComingSoon?: boolean;
  onClick?: () => void;
  className?: string;
}

const badgeVariants = {
  recommended: "bg-gradient-to-r from-green-400 to-blue-500",
  free: "bg-gradient-to-r from-purple-400 to-pink-500", 
  advanced: "bg-gradient-to-r from-orange-400 to-red-500",
};

const cardVariants = {
  enabled: "bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] cursor-pointer border-white/[0.1]",
  disabled: "bg-gradient-to-br from-white/[0.04] to-white/[0.01] cursor-not-allowed opacity-70 border-white/[0.08]",
};

const hoverEffects = {
  indigo: "hover:shadow-indigo-500/20",
  purple: "hover:shadow-purple-500/20",
  disabled: "",
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  badge,
  isEnabled = true,
  showComingSoon = false,
  onClick,
  className = "",
}) => {
  const getHoverEffect = () => {
    if (!isEnabled) return hoverEffects.disabled;
    if (badge?.variant === "recommended") return hoverEffects.indigo;
    if (badge?.variant === "free") return hoverEffects.purple;
    return hoverEffects.disabled;
  };

  return (
    <div
      className={`relative backdrop-blur-sm rounded-[20px] p-6 transition-all duration-300 transform border ${
        isEnabled ? "hover:scale-[1.02] hover:shadow-2xl" : ""
      } ${cardVariants[isEnabled ? "enabled" : "disabled"]} ${getHoverEffect()} ${className} ${
        !isEnabled ? "overflow-hidden" : ""
      }`}
      onClick={isEnabled ? onClick : undefined}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`${badgeVariants[badge.variant]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {badge.text}
          </span>
        </div>
      )}

      <div className="space-y-6">
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center text-5xl ${!isEnabled ? "opacity-60" : ""}`}>
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className={`text-2xl font-bold ${isEnabled ? "text-foreground" : "text-foreground/70"}`}>
            {title}
          </h3>
          <p className={`leading-relaxed ${isEnabled ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
            {description}
          </p>
        </div>

        {/* Coming Soon Badge */}
        {showComingSoon && (
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.05] text-sm text-foreground/60 border border-white/[0.1]">
              🚀 Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Overlay effect for disabled cards */}
      {!isEnabled && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};