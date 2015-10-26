<section class="carousel" data-module="carousel">
<?php 

if( have_rows('slides') ) {
  while( have_rows('slides') ) { the_row();
    $content = get_sub_field('content');

    ?>

    <div class="slide">

    <?php

    if($content) {
      echo apply_filters( 'the_content', $content );
    }

    ?>

    </div>

    <?php

  }
}

?>
</section>