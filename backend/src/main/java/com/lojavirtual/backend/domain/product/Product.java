package com.lojavirtual.backend.domain.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lojavirtual.backend.domain.cart.Cart;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "product")
@Entity(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String img;
    private Integer price;
    private Integer promo;

    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Cart> carts;

    public Product(ProductRequestDTO data) {
        this.update(data);
    }

    public void update(ProductRequestDTO data) {
        this.name = data.name();
        this.img = data.img();
        this.price = data.price();
        this.promo = data.promo();
    }
}
