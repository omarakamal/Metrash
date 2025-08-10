export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container-max py-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="subtle">© {new Date().getFullYear()} GreenBasket Grocery</p>
        <div className="flex gap-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}
