interface GateConfirmDialogProps {
  open: boolean;
  onReview: () => void;
  onProceed: () => void;
}

export function GateConfirmDialog({ open, onReview, onProceed }: GateConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 z-30 flex items-center justify-center bg-charcoal/50 px-4"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
        <p className="text-lg font-bold text-charcoal">Chưa tích hết mà đã đòi đi tiếp? 😏</p>
        <p className="mt-2 text-charcoal/80">
          Bạn tương lai sẽ cảm ơn bạn vì đã kiểm tra kỹ đó!
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onReview}
            className="min-h-[44px] rounded-lg bg-military px-4 py-2 font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Để mình xem lại
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="min-h-[44px] rounded-lg border border-military/30 px-4 py-2 font-semibold text-military transition-colors hover:bg-military/5"
          >
            Mình biết mình đang làm gì
          </button>
        </div>
      </div>
    </div>
  );
}
