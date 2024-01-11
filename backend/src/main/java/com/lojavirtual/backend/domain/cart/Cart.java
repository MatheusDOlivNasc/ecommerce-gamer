package com.lojavirtual.backend.domain.cart;

import com.lojavirtual.backend.domain.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Table(name = "cart")
@Entity(name = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String owner;
    private Timestamp createAt;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "prods_in_cart",
        joinColumns = @JoinColumn(name = "cart_id"),
        inverseJoinColumns = @JoinColumn(name = "prod_id")
    )
    private List<Product> products;

    public Cart(CartRequestDTO data, List<Product> products, String owner) {
        this.owner = owner;
        this.createAt = new Timestamp(data.createAt());
        this.products = products;
    }

    public CartResponseDTO toData() {
        return new CartResponseDTO(
            this.getId(),
            this.getOwner(),
            this.getCreateAt().getTime(),
            this.getProducts()
        );
    }
}
