document.addEventListener('alpine:init', () => {
    Alpine.data('makanan', () => ({
        // bagian item makanan
    items: [
        {id: 11, name: 'Nasi Goreng Spesial.', img: 'nasi goreng.jpg', price: 10000},
        {id: 12, name: 'Siomay Spesial', img: 'siomay.jpg', price: 8000},
        {id: 13, name: 'Pisang Keju', img: 'pisang-keju.jpg', price: 5000},
        {id: 14, name: 'Burcangjo', img: 'bubur-kacang-ijo.jpg', price: 5000},
        {id: 15, name: 'Mie Goreng Spesial.', img: 'mie goreng spesial.jpg', price: 10000},
        {id: 16, name: 'Ketoprak', img: 'ketoprak.jpg', price: 8000},
        {id: 17, name: 'Nasi Bakar.', img: 'nasi bakar.jpg', price: 5000},
        {id: 18, name: 'Pempek Kapal Selam', img: 'pempek.jpg', price: 10000}
    ],    
    }))


    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // cartnya kosong
            if (!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
                // cartnya sudah ada
            } else {
                this.items = this.item.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }

        },
        remove(id) {
            // ambil item yang mau di remove
            const cartItem = this.items.find((item) => item.id === id);
            // jika item lebih dari satu
            if (cartItem.quantity > 1) {
                // telusuri satu-satu
                this.items = this.items.map((item) => {
                    // jika bukan barang yang di klik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } 
            else if(cartItem.quantity === 1) {
                // jika barangnya sisa satu
                this.items = this.itemsfilter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
})

document.addEventListener('alpine:init', () => {
    Alpine.data('minuman', () => ({
        // bagian item makanan
    items: [
        {id: 21, name: 'Kopi Tubruk', img: 'coffe-tubruk.jpg', tagLine: 'Kopi Tubruk ini cocok dinikmati ketika cuaca hujan.', price: 5000},
        {id: 22, name: 'Minuman Temulawak', img: 'minuman-temulawak.jpg', tagLine: 'Temulawak minuman herbal yang enak untuk dinikmati', price: 5000},
        {id: 23, name: 'Es Pisang Ijo', img: 'es pisang ijo.jpg', tagLine: 'es yang sangat segar yang wajib dinikmati.', price: 5000},
        {id: 24, name: 'Es teh', img: 'Es teh.jpg', tagLine: 'minuman yang segar saat musim panas.', price: 2000},
        {id: 25, name: 'Sule (susu kedelai)', img: 'Susu-kedelai.jpg', tagLine: 'Minuman yang sangat direkomendasikan untuk dicoba di Hanscafendo.', price: 5000},
        {id: 26, name: 'Es Cingcau', img: 'es cingcau.jpg', tagLine: 'minuman yang segar saat musim panas.', price: 5000},
        {id: 27, name: 'Susu Jahe', img: 'susu jahe.jpg', tagLine: 'Minuman yang enak saat musim hujan.', price: 5000},
        {id: 28, name: 'Kopi Jahe', img: 'kopi jahe.jpg', tagLine: 'Kopi Jahe minuman yang wajib dicoba.', price: 5000},
    ],    
    }))
})

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}

