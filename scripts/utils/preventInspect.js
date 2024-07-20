//inspect disable
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
  }
});