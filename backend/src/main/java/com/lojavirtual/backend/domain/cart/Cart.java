package com.lojavirtual.backend.domain.cart;

import com.lojavirtual.backend.domain.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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
    private String createAt;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "prodInCart", joinColumns = {
        @JoinColumn(name = "card_id", referencedColumnName = "id")
    }, inverseJoinColumns = {
        @JoinColumn(name = "prod_id", referencedColumnName = "id")
    })
    private Set<Product> products;
}
