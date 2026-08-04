import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Copy, X, ShieldCheck, Truck } from "lucide-react";
import { useEffect } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  affiliateUrl: string;
};

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onCopy: () => void;
}

export function ProductModal({ product, onClose, onCopy }: ProductModalProps) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 backdrop-blur transition-colors hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div
            className="aspect-square w-full bg-gradient-to-br from-amber-100 to-orange-100"
            style={{ backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />

          <div className="flex flex-col p-6">
            <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
              {product.category}
            </span>
            <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-slate-900">
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <= Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {product.price.toFixed(2)} €
              </span>
              <span className="text-base text-slate-400 line-through">
                {product.oldPrice.toFixed(2)} €
              </span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600">
                -{discount}%
              </span>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Paiement sécurisé via AliExpress
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Truck className="h-4 w-4 text-orange-500" />
                Livraison internationale
              </div>
            </div>

            <div className="mt-auto flex gap-2 pt-6">
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600"
                onClick={() => window.open(product.affiliateUrl, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Acheter maintenant
              </Button>
              <Button
                variant="outline"
                className="border-amber-200 text-slate-600 hover:bg-amber-50"
                onClick={onCopy}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}