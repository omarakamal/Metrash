import React from "react";

export default function Footer(){
  return (
    <footer id="contact" className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white font-bold">M</span>
              <span className="text-base font-semibold text-slate-800">Corner Grocer</span>
            </div>
            <p className="mt-4 text-sm text-slate-600">Thanks for shopping local. See you soon!</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Address</h3>
              <p className="mt-2 text-sm text-slate-600">123 Neighborhood Rd<br/>Manama, Bahrain</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
              <p className="mt-2 text-sm text-slate-600">
                <a className="hover:text-sky-700" href="tel:+97300000000">+973 0000 0000</a><br/>
                <a className="hover:text-sky-700" href="https://wa.me/97300000000" target="_blank" rel="noreferrer">WhatsApp us</a><br/>
                <a className="hover:text-sky-700" href="mailto:hello@cornergrocery.com">hello@cornergrocery.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Hours</h3>
              <p className="mt-2 text-sm text-slate-600">Sat–Thu: 8:00–22:00<br/>Fri: 14:00–22:00</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-xs text-slate-500">© {new Date().getFullYear()} Corner Grocer. All rights reserved.</div>
      </div>
    </footer>
  );
}
